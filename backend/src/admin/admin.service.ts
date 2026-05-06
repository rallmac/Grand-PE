import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './schema/admin.schema';
import { EmailService } from '../email/email.service';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { AdminRegisterDto } from './dto/adminRegister.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,

    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  // ================= REGISTER =================
  async register(dto: AdminRegisterDto) {
    const {firstName, lastName, userName, address, email} = dto;
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
      loginAttempts: 0,
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

    // Notify superadmin
    await this.emailService.approvedAsAdmin(admin.email);

    return { message: 'Account verified. Await approval.' };
  }

  // ================= LOGIN =================
  async login(email: string, password: string) {
    const admin = await this.adminModel
      .findOne({ email })
      .select('+password +loginAttempts +lockUntil');

    if (!admin) throw new UnauthorizedException('Invalid credentials');

    // Check lock
    if (admin.lockUntil && admin.lockUntil > new Date()) {
      throw new ForbiddenException('Account locked. Try again later.');
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      admin.loginAttempts = (admin.loginAttempts || 0) + 1;

      // Lock after 5 attempts
      if (admin.loginAttempts >= 5) {
        admin.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
        admin.loginAttempts = 0;
      }

      await admin.save();

      throw new UnauthorizedException('Invalid credentials');
    }

    // Reset attempts on success
    admin.loginAttempts = 0;
    admin.lockUntil = null;

    if (!admin.isVerified) {
      throw new UnauthorizedException('Verify your email first');
    }

    if (!admin.isApproved) {
      throw new UnauthorizedException('Await superadmin approval');
    }

    const payload = {
      sub: admin._id,
      email: admin.email,
      role: 'admin',
    };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '2d', // shorter for admins
    });

    admin.refreshToken = await bcrypt.hash(refresh_token, 10);
    admin.lastActivity = new Date();

    await admin.save();

    return { access_token, refresh_token };
  }

  // ================= ACTIVITY CHECK (for guards) =================
  async validateSession(adminId: string) {
    const admin = await this.adminModel.findById(adminId);

    if (!admin) throw new UnauthorizedException();

    const TWO_HOURS = 1000 * 60 * 60 * 2;

    if (
      admin.lastActivity &&
      Date.now() - new Date(admin.lastActivity).getTime() > TWO_HOURS
    ) {
      admin.refreshToken = undefined;
      await admin.save();

      throw new UnauthorizedException('Session expired due to inactivity');
    }

    // update activity
    admin.lastActivity = new Date();
    await admin.save();

    return admin;
  }

  // ================= REQUEST RESET PASSWORD =================
  async requestPasswordReset(email: string) {
    const admin = await this.adminModel.findOne({ email });

    if (!admin) {
      return { message: 'If email exists, reset link sent' };
    }

    const token = randomBytes(32).toString('hex');

    admin.resetPasswordToken = token;
    admin.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60);

    await admin.save();

    await this.emailService.sendResetPasswordEmail(email, token);

    return { message: 'If email exists, reset link sent' };
  }

  // ================= RESET PASSWORD =================
  async resetPassword(token: string, password: string) {
    const admin = await this.adminModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!admin) {
      throw new BadRequestException('Invalid or expired token');
    }

    admin.password = await bcrypt.hash(password, 10);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    // Force logout everywhere
    admin.refreshToken = undefined;

    await admin.save();

    return { message: 'Password reset successful' };
  }

  // ================= LOGOUT =================
  async logout(adminId: string) {
    await this.adminModel.updateOne(
      { _id: adminId },
      { $unset: { refreshToken: '' } },
    );

    return { message: 'Logged out successfully' };
  }
}
