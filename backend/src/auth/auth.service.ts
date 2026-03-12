import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/user.schema';
import { MailService } from '../mail/mail.service';
import { randomBytes } from 'crypto';
// import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('Email not found');
    const resetToken = randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 1000 * 60 * 30); // 30 min
    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();
    const resetUrl = `${this.cfg.get('FRONTEND_BASE_URL')}/reset-password?token=${resetToken}`;
    await this.mail.sendResetPasswordEmail(user.email, resetUrl);
    return { message: 'If your email exists, a reset link has been sent.' };
  }

  async verifyResetToken(token: string) {
    const user = await this.userModel.findOne({ resetToken: token, resetTokenExpires: { $gt: new Date() } });
    if (!user) throw new BadRequestException('Invalid or expired token');
    return { email: user.email };
  }

  async resetPassword(token: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) throw new BadRequestException('Passwords do not match');
    const user = await this.userModel.findOne({ resetToken: token, resetTokenExpires: { $gt: new Date() } });
    if (!user) throw new BadRequestException('Invalid or expired token');
    user.passwordHash = await bcrypt.hash(password, 12);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    return { message: 'Password reset successful' };
  }
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private cfg: ConfigService,
    private mail: MailService,
  ) {}

  private signAccessToken(user: UserDocument) {
    return this.jwt.sign({
      sub: user._id.toString(),
      email: user.email,
    });
  }

  async register(name: string, email: string, password: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new ConflictException('Email already in use');

    const passwordHash = await bcrypt.hash(password, 12);

    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    const user = await this.userModel.create({
      email,
      passwordHash,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    const verifyUrl = `${this.cfg.get('FRONTEND_BASE_URL')}/verify-email?token=${verificationToken}`;
    await this.mail.sendVerificationEmail(user.email, verifyUrl);

    return { message: 'Registered. Check your email to verify your account.' };
  }

  async verifyEmail(token: string) {
    const user = await this.userModel.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });
    if (!user) throw new BadRequestException('Invalid or expired token');

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return { message: 'Email verified successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    if (!user.isVerified) throw new UnauthorizedException('Email not verified');

    const accessToken = this.signAccessToken(user);
    return { accessToken };
  }

  async me(userId: string) {
    const user = await this.userModel.findById(userId).select('_id email isVerified createdAt updatedAt');
    return user;
  }

/** async cleanupUnverified() {
      const result = await this.userModel.deleteMany({
          isVerified: false,
          createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      })
      return { deleted: result.deletedCount };
  }
*/
}
