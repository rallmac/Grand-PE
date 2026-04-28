import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../admin/schema/admin.schema';
import { EmailService } from '../email/email.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperadminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,

    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  // ================= LOGIN =================
  async login(email: string, password: string) {
    const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL;
    const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD;

    if (!SUPERADMIN_EMAIL || !SUPERADMIN_PASSWORD) {
      throw new UnauthorizedException('Superadmin not configured');
    }

    if (email !== SUPERADMIN_EMAIL) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, SUPERADMIN_PASSWORD);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: 'superadmin',
      email,
      role: 'superadmin',
    };

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m', // stricter than admin
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '1d',
    });

    return {
      access_token,
      refresh_token,
      message: 'Superadmin login successful',
    };
  }

  // ================= LOGOUT =================
  async logout() {
    // Since superadmin is stateless (no DB session),
    // logout is handled client-side by deleting tokens

    return { message: 'Logged out successfully' };
  }

  // ================= APPROVE ADMIN =================
  async approveAdmin(email: string) {
    const admin = await this.adminModel.findOne({ email });

    if (!admin) throw new BadRequestException('Admin not found');

    if (!admin.isVerified) {
      throw new BadRequestException('Admin has not verified email');
    }

    if (admin.isApproved) {
      return { message: 'Admin already approved' };
    }

    admin.isApproved = true;
    await admin.save();

    await this.emailService.approveAsAdmin(email);

    return { message: 'Admin approved successfully' };
  }

  // ================= REMOVE ADMIN =================
  async removeAdmin(email: string) {
    const admin = await this.adminModel.findOne({ email });

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }

    // 🔒 Prevent deleting superadmin accidentally
    if (email === process.env.SUPERADMIN_EMAIL) {
      throw new ForbiddenException('Cannot remove superadmin');
    }

    // 🔒 Invalidate sessions
    admin.refreshToken = undefined;

    // Option A: Hard delete
    await this.adminModel.deleteOne({ email });

    // Option B (better): soft delete (if you added isDeleted)
    // admin.isDeleted = true;
    // admin.deletedAt = new Date();
    // await admin.save();

    await this.emailService.removedAsAdmin(email);

    return { message: 'Admin removed successfully' };
  }
}