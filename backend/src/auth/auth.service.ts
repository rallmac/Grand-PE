import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@InjectModel('User') private userModel: Model<any>,
		private emailService: EmailService,
		) {}

	async register(email: string){
		const existingUser = await this.userModel.findOne({ email });

		if (existingUser) {
			throw new Error('User already exists');
		}

		const token = randomBytes(32).toString('hex');

		const user = this.userModel.create({
			email,
			isVerified: false,
			VerificationToken: token,
			VerificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60),
		});

		await this.emailService.sendVerificationEmail(email, token);

		const link = `https://localhost:3000/auth/verify?token=${'token'}`;

		// console.log('Verificaion link:', link); 'This is only allowed during development'

		return { message: 'Verification email sent' };
	}

	async validateUser(email: string, password: string) {
		const user = await this.userModel
		.findOne({ email })
		.select('+password');

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return user;
	}

	async verifyEmail(token: string){
		const user = await this.userModel.findOne({
			verificationToken: token,
			verificationTokenExpires: { $gt: new Date() },
		});

		if (!user) {
			throw new Error('Invalid or Expired token')
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpires = undefined;

		await user.save();

		return {
			message: 'Email verified. You can now set your password.',
		};
	}

	async setPassword(token: string, password: string) {
		const user = await this.userModel.findOne({verificationToken: token});

		if (!user) {
			throw new Error('Invalid Token')
		};

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		user.password = hashedPassword; // I must Hash this later: Now hashed
		user.verificationToken = undefined;

		await user.save();

		return {
			message: 'Password Set Successfully',
		};

		const payload = { sub: user._id, email: user.email };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async login(user: any) {
		const payload = { sub: user._id, email: user.email };

		const access_token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET,
		});

		const refresh_token = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: '7d',
		});

		return { access_token, refresh_token, };
	}

	async resendVerification(email: string) {
		const user = this.userModel.findOne({ email });

		if (!user) {
			throw new BadRequestException('User not found');
		}

		if (user.isVerified) {
			throw new BadRequestException('User already verified');
		}

		if (!user.isVerified) {
			throw new UnauthorizedException('Please verify you email first');
		}

		// Instead of using the former token, generate a new one
		const token = randomBytes(32).toString('hex');

		user.verificationToken = token;
		user.verificationTokenExpires = new Date(Date.now() + 1000 * 60 * 60);

		await user.save();

		await this.emailService.sendVerificationEmail(email, token);

		return {
			message: 'Verification email resent',
		};

		const now = new Date();

		if (
			user.lastVerificationEmailSent &&
			now.getTime() - user.lastVerificationEmailSent.getTime() < 60000
		) {
			throw new BadRequestException('Please wait before requesting again');
		}

		user.lastVerificaitonEmailSent = now;

		if (existingUser && !existingUser.isVerified) {
			return this.resendVerification(email);
		}
	}

	async forgotPassword(email: string) {
		return this.resendResetPassword(email);
		/**
		 * const user = await this.userModel.findOne({ email });

		if (!user) {
			return { message: 'If this email exists, a reset link has been sent' }; 
		}

		const token = randomBytes(32).toString('hex');

		user.resetPasswordToken = token;
		user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60);

		await user.save();

		await this.emailService.sendResetPasswordEmail(email, token);

		return { message: 'If this email exists, a reset link has been sent' };
		**/
	}

	async resetPassword(token: string, password: string) {
		const user = await this.userModel.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: new Date() },
		});

		const hashedToken = await bcrypt.hash(token, 10);
		user.resetPasswordToken = hashedToken;
		bcrypt.compare(token, user.resetPasswordToken);

		if (!user) {
			throw new BadRequestException('Invalid or expired token');
		}

		user.password = await bcrypt.hash(password, 10);

		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;

		await user.save();

		return {message: 'Password reset successful'};
	}

	async resendResetPassword(email: string) {
		const user = await this.userModel.findOne({ email });

		if (!user) {
			return { message: 'If this email exists, a reset link has been sent' };
		}

		if (!user.resetPasswordToken) {
			return { message: 'If this email exists, a reset link has been sent' };
		}

		const now = new Date();

		if (
			user.lastResetEmailSent &&
			now.getTime() - user.lastResetEmail.getTime() < 60000
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

	async refresh(refreshTokens: string[]) {
		try {
			const newRefreshToken = this.jwtService.sign(payload, {
				secret: process.env.JWT_REFRESH_SECRET,
				expiresIn: '7d',
			});

			user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
			await user.save();

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

			// I rather issue new access token
			const newAccesToken = this.jwtService.sign(
				{ sub: user._id, email: user.email },
				{
					secret: process.env.JWT_SECRET,
					expiresIn: '15',
				},
			);

			return {
				access_token: newAccesToken,
				refresh_token: newRefreshToken,
			};
		} 	catch (err) {
			throw new UnauthorizedException('Invalid refresh token');
		}
	}
}
