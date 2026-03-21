import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@InjectModel('User') private userModel: Model<any>,
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

		return { access_token: this.jwtService.sign(payload),
		};
	}

}
