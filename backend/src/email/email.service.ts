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
		const url = `http://localhost:3000/auth/verify?token=${token}`;

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
}
