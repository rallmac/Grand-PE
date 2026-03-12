import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendResetPasswordEmail(to: string, resetUrl: string) {
    const from = this.cfg.get<string>('MAIL_FROM') ?? 'no-reply@example.com';
    await this.transporter.sendMail({
      from,
      to,
      subject: 'Reset your password',
      html: `
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <p><a href="${resetUrl}" target="_blank">Reset Password</a></p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p>${resetUrl}</p>
      `,
    });
  }
  private transporter: nodemailer.Transporter;

  constructor(private cfg: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.cfg.get<string>('SMTP_HOST'),
      port: this.cfg.get<number>('SMTP_PORT'),
      service: 'gmail',
      secure: true,
      auth: {
        user: this.cfg.get<string>('SMTP_USER'),
        pass: this.cfg.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendVerificationEmail(to: string, verifyUrl: string) {
    const from = this.cfg.get<string>('MAIL_FROM') ?? 'no-reply@example.com';
    await this.transporter.sendMail({
      from,
      to,
      subject: 'Verify your email',
      html: `
        <p>Welcome! Please verify your email by clicking the link below:</p>
        <p><a href="${verifyUrl}" target="_blank">Verify Email</a></p>
        <p>If the button doesn't work, copy and paste this URL into your browser:</p>
        <p>${verifyUrl}</p>
      `,
    });
  }
}
