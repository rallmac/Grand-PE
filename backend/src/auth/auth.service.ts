import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { AdminAllowlist } from '../admin/schema/admin-allowlist.schema';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<any>,
    private emailService: EmailService,
    @InjectModel(AdminAllowlist.name)
    private adminAllowlistModel: Model<AdminAllowlist>,
  ) {}

  // ================= REGISTER =================
  async register(email: string) {
    const existingUser = await this.userModel.findOne({ email });

    // ✅ Already verified → block
    if (existingUser && existingUser.isVerified) {
      throw new BadRequestException({
        success: false,
        message: 'User already exists',
      });
    }

    // ✅ Already registered but NOT verified → DO NOT overwrite token
    if (existingUser && !existingUser.isVerified) {
      return {
        success: true,
        message: 'Verification email already sent. Please check your inbox.',
      };
    }

    // User can login or register based on assigned role
    const isAllowedAdmin = await this.adminAllowlistModel.findOne({
      email: email,
    });

    const role = isAllowedAdmin ? 'admin' : 'user';

    // ✅ New user
    const token = randomBytes(32).toString('hex');

    await this.userModel.create({
      email,
      role,
      isVerified: false,
      verificationToken: token,
      verificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    });

    await this.emailService.sendVerificationEmail(email, token);

    return {
      success: true,
      message: 'Verification email sent',
    };
  }

  // ================= VERIFY EMAIL =================
    async verifyEmail(token: string) {
    const user = await this.userModel.findOne({
      verificationToken: token,
    });

    // ✅ If token already used but user is verified → still success
    if (!user) {
      const alreadyVerifiedUser = await this.userModel.findOne({
        isVerified: true,
      });

      if (alreadyVerifiedUser) {
        return {
          success: true,
          isVerified: true,
          message: 'Email already verified',
        };
      }

      throw new BadRequestException('Invalid or expired token');
    }

    // ✅ Check expiry
    if (user.verificationTokenExpires < new Date()) {
      throw new BadRequestException('Token expired');
    }

    // ✅ Verify
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    return {
      success: true,
      isVerified: true,
      message: 'Email verified successfully',
    };
  }

  // ================= RESEND VERIFICATION =================
  async resendVerification(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isVerified) {
      throw new BadRequestException('User already verified');
    }

    const token = randomBytes(32).toString('hex');

    user.verificationToken = token;
    user.verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60);

    await user.save();

    await this.emailService.sendVerificationEmail(email, token);

    return { message: 'Verification email resent' };
  }

  // ================= SET PASSWORD =================
  async setPassword(token: string, password: string) {
    const user = await this.userModel.findOne({
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });

    if (!user) {
      throw new BadRequestException('Verify email to set password');
    }

    user.password = await bcrypt.hash(password, 10);
    //user.verificationToken = null;
    //user.verificationTokenExpires = null;

    await user.save();

    return { message: 'Password set successfully' };
  }

  // ================= VALIDATE =================
  async validateUser(email: string, password: string) {
    const user = await this.userModel
      .findOne({ email })
      .select('+password');

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    return user;
  }

  // ================= LOGIN =================
  async login(user: any) {
    const payload = { sub: user._id, email: user.email };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    user.refreshToken = await bcrypt.hash(refresh_token, 10);
    await user.save();

    return {
      access_token,
      refresh_token,
      message: 'Login successful',
    };
  }

  // ================= FORGOT PASSWORD =================
  async forgotPassword(email: string) {
    return this.resendResetPassword(email);
  }

  // ================= RESET PASSWORD =================
  async resetPassword(token: string, password: string) {
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return { message: 'Password reset successful' };
  }

  // ================= RESEND RESET =================
  async resendResetPassword(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return { message: 'If this email exists, a reset link has been sent' };
    }

    const now = new Date();

    if (
      user.lastResetEmailSent &&
      now.getTime() - user.lastResetEmailSent.getTime() < 60000
    ) {
      throw new BadRequestException('Please wait before requesting again');
    }

    const token = randomBytes(32).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60);
    user.lastResetEmailSent = now;

    await user.save();

    await this.emailService.sendResetPasswordEmail(email, token);

    return { message: 'If this email exists, a reset link has been sent' };
  }

  // ================= REFRESH =================
  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userModel.findById(payload.sub);

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(
        refreshToken,
        user.refreshToken,
      );

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const newAccessToken = this.jwtService.sign(
        { sub: user._id, email: user.email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );

      return { access_token: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // ================= LOGOUT =================
  async logout(userId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      { $unset: { refreshToken: '' } },
    );

    return { message: 'Logged out successfully' };
  }
}