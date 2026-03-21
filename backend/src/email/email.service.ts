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

		await this.transporter
	}
}
