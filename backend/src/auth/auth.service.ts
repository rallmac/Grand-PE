import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@InjectModel('User') private userModel: Model<any>,
		) {}

	async validateUser(email: string, password: string) {
		const user = await this.userModel.findOne({ email });

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		if (user.password !== password) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return user;
	}

	async login(user: any) {
		const payload = { sub: user._id, email: user.email };

		return { access_token: this.jwtService.sign(payload),
		};
	}
}
