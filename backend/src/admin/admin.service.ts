import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminSchema } from './schema/admin.schema';
import { EmailService } from '../email/email.service';


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,

    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  // ================= REGISTER =================
  async register(email: string) {
    const existing = await this.adminModel.findOne({ email });

    if (existing && existing.isVerified) {
      throw new BadRequestException('Admin already exists');
    }

    if (existing && !existing.isVerified) {
      return { message: 'Verification already sent' };
    }

    const token = randomBytes(32).toString('hex');

    await this.adminModel.create({
      email,
      isVerified: false,
      isApproved: false,
      verificationToken: token,
      verificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60),
    });

    await this.emailService.sendVerificationEmail(email, token);

    return { message: 'Verification email sent' };
  }

  // ================= SET PASSWORD =================
  async setPassword(token: string, password: string) {
    const admin = await this.adminModel.findOne({
      verificationToken: token,
    });

    if (!admin) throw new BadRequestException('Invalid token');

    if (
      !admin.verificationTokenExpires ||
      admin.verificationTokenExpires < new Date()
    ) {
      throw new BadRequestException('Token expired');
    }

    admin.password = await bcrypt.hash(password, 10);
    admin.isVerified = true;

    admin.verificationToken = undefined;
    admin.verificationTokenExpires = undefined;

    await admin.save();

    // Notifies superadmin AFTER verification
    await this.emailService.notifySuperAdminForApproval(admin.email);

    return { message: 'Account verified. Await approval.' };
  }

  // ================= LOGIN =================
  async login(email: string, password: string) {
    const admin = await this.adminModel
      .findOne({ email })
      .select('+password');

    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, admin.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    if (!admin.isVerified) {
      throw new UnauthorizedException('Verify your email first');
    }

    if (!admin.isApproved) {
      throw new UnauthorizedException('Await superadmin approval');
    }

    const payload = { sub: admin._id, email: admin.email, role: 'admin' };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    admin.refreshToken = await bcrypt.hash(refresh_token, 10);
    await admin.save();

    return { access_token, refresh_token };
  }

  // ================= RESET PASSWORD =================
  async resetPassword(token: string, password: string) {
    const admin = await this.adminModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!admin) throw new BadRequestException('Invalid or expired token');

    admin.password = await bcrypt.hash(password, 10);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    return { message: 'Password reset successful' };
  }
}
