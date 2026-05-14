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
    const {
      firstName,
      lastName,
      userName,
      address,
      email,
    } = dto;

    const existing = await this.adminModel.findOne({
      email,
    });

    // Admin already verified
    if (existing && existing.isVerified) {
      throw new BadRequestException(
        'Admin already exists',
      );
    }

    // Resend verification email if admin exists but not verified
    if (existing && !existing.isVerified) {
      const token = randomBytes(32).toString(
        'hex',
      );

      existing.verificationToken = token;

      existing.verificationTokenExpires =
        new Date(
          Date.now() + 1000 * 60 * 60,
        );

      await existing.save();

      await this.emailService.adminSendVerificationEmail(
        email,
        token,
      );

      return {
        success: true,
        message:
          'New verification email sent',
      };
    }

    // Create new admin
    const token = randomBytes(32).toString(
      'hex',
    );

    const expires = new Date(
      Date.now() + 1000 * 60 * 60,
    );

    await this.adminModel.create({
      firstName,
      lastName,
      userName,
      address,
      email,

      isVerified: false,
      isApproved: false,

      verificationToken: token,
      verificationTokenExpires: expires,

      loginAttempts: 0,
    });

    // Send verification email
    await this.emailService.adminSendVerificationEmail(
      email,
      token,
    );

    return {
      success: true,
      message: 'Verification email sent',
    };
  }

  // ================= SET PASSWORD =================
  async setPassword(
    token: string,
    password: string,
  ) {
    console.log(
      'BACKEND RECEIVED TOKEN:',
      token,
    );

    const admin = await this.adminModel.findOne({
      verificationToken: token,
    });

    console.log({
      foundAdmin: admin,
      expires:
        admin?.verificationTokenExpires,
      now: new Date(),
    });

    // Invalid token
    if (!admin) {
      throw new BadRequestException(
        'Invalid token',
      );
    }

    // Missing expiry
    if (!admin.verificationTokenExpires) {
      throw new BadRequestException(
        'Token expiry not found',
      );
    }

    // Check expiry
    const now = Date.now();

    const expires =
      admin.verificationTokenExpires.getTime();

    if (expires < now) {
      throw new BadRequestException(
        'Token expired',
      );
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Save password
    admin.password = hashedPassword;

    // Email verified
    admin.isVerified = true;

    // Awaiting super admin approval
    admin.isApproved = false;

    // Clear verification token
    admin.verificationToken = undefined;

    admin.verificationTokenExpires =
      undefined;

    await admin.save();

    // Notify super admin
    await this.emailService.approveAsAdmin(
      admin.email,
    );

    return {
      success: true,
      message:
        'Account verified successfully. Approval notification has been sent to the super admin.',
    };
  }

  // ================= LOGIN =================
  async login(
    email: string,
    password: string,
  ) {
    const admin = await this.adminModel
      .findOne({ email })
      .select(
        '+password +loginAttempts +lockUntil',
      );

    if (!admin) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    // Check lock
    if (
      admin.lockUntil &&
      admin.lockUntil > new Date()
    ) {
      throw new ForbiddenException(
        'Account locked. Try again later.',
      );
    }

    // Compare password
    const match = await bcrypt.compare(
      password,
      admin.password,
    );

    if (!match) {
      admin.loginAttempts =
        (admin.loginAttempts || 0) + 1;

      // Lock after 5 failed attempts
      if (admin.loginAttempts >= 5) {
        admin.lockUntil = new Date(
          Date.now() + 15 * 60 * 1000,
        );

        admin.loginAttempts = 0;
      }

      await admin.save();

      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    // Reset attempts
    admin.loginAttempts = 0;
    admin.lockUntil = null;

    // Email verification check
    if (!admin.isVerified) {
      throw new UnauthorizedException(
        'Verify your email first',
      );
    }

    // Approval check
    if (!admin.isApproved) {
      throw new UnauthorizedException(
        'Await superadmin approval',
      );
    }

    const payload = {
      sub: admin._id,
      email: admin.email,
      role: admin.role,
    };

    // Access token
    const access_token =
      this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });

    // Refresh token
    const refresh_token =
      this.jwtService.sign(payload, {
        secret:
          process.env.JWT_REFRESH_SECRET,
        expiresIn: '2d',
      });

    // Save hashed refresh token
    admin.refreshToken =
      await bcrypt.hash(refresh_token, 10);

    admin.lastActivity = new Date();

    await admin.save();

    return {
      access_token,
      refresh_token,
    };
  }

  // ================= VALIDATE SESSION =================
  async validateSession(adminId: string) {
    const admin =
      await this.adminModel.findById(
        adminId,
      );

    if (!admin) {
      throw new UnauthorizedException();
    }

    const TWO_HOURS =
      1000 * 60 * 60 * 2;

    if (
      admin.lastActivity &&
      Date.now() -
        new Date(
          admin.lastActivity,
        ).getTime() >
        TWO_HOURS
    ) {
      admin.refreshToken = undefined;

      await admin.save();

      throw new UnauthorizedException(
        'Session expired due to inactivity',
      );
    }

    // Update activity
    admin.lastActivity = new Date();

    await admin.save();

    return admin;
  }

  // ================= REQUEST PASSWORD RESET =================
  async requestPasswordReset(
    email: string,
  ) {
    const admin = await this.adminModel.findOne(
      { email },
    );

    if (!admin) {
      return {
        message:
          'If email exists, reset link sent',
      };
    }

    const token = randomBytes(32).toString(
      'hex',
    );

    admin.resetPasswordToken = token;

    admin.resetPasswordExpires =
      new Date(
        Date.now() + 1000 * 60 * 60,
      );

    await admin.save();

    await this.emailService.sendResetPasswordEmail(
      email,
      token,
    );

    return {
      message:
        'If email exists, reset link sent',
    };
  }

  // ================= RESET PASSWORD =================
  async resetPassword(
    token: string,
    password: string,
  ) {
    const admin = await this.adminModel.findOne(
      {
        resetPasswordToken: token,
        resetPasswordExpires: {
          $gt: new Date(),
        },
      },
    );

    if (!admin) {
      throw new BadRequestException(
        'Invalid or expired token',
      );
    }

    admin.password = await bcrypt.hash(
      password,
      10,
    );

    admin.resetPasswordToken = undefined;

    admin.resetPasswordExpires =
      undefined;

    // Force logout from all devices
    admin.refreshToken = undefined;

    await admin.save();

    return {
      message:
        'Password reset successful',
    };
  }

  // ================= LOGOUT =================
  async logout(adminId: string) {
    await this.adminModel.updateOne(
      { _id: adminId },
      {
        $unset: {
          refreshToken: '',
        },
      },
    );

    return {
      message:
        'Logged out successfully',
    };
  }
}
