import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
	private transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	async sendVerificationEmail(to: string, token: string) {
		const url = `https://grand-pe.onrender.com/verify?token=${token}`;

		await this.transporter.sendMail({
			from: `"Grand-PE" <${process.env.EMAIL_USER}>`,
			to,
			subject: 'Verify your email',
			html: `
				<h3>Verify your email<h3/>
				<p>Click the link below to verify your email:</P>
				<a href="${url}">${url}</a>
				`,
		});
	}

	async sendResetPasswordEmail(to: string, token: string) {
		const url = `https://grand-pe.onrender.com/reset-password?token=${token}`;

		await this.transporter.sendMail({
			to,
			subject: 'Reset your password',
			html: `
				<h3>Reset Password</h3>
				<p>Click below to reset:</p>
				<a href="${url}">${url}</a>
				`,
		});
	}

        async approvedAsAdmin(to: string) {
            await this.transporter.sendMail({
                to,
                subject: 'Approved as admin',
                html: `
                   <h3>Account Approved As Admin</h3>
                   <p>This is to inform you that your request to be an admin has been approved</p>
                   <p>You can now perform services on products</p>
                `,
            });
        }

        async removedAsAdmin(to: string) {
            await this.transporter.sendMail({
                to,
                subject: 'Admin Access Removed',
                html: `
                   <h3>Admin Access Revoked</h3>
                   <p>Your admin access has been removed.</p>
                   <p>You will no longer be able to login to the admin dashboard.</p>
                `,
            });
        }
}

