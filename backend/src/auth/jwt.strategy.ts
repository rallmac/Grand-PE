import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/schema/user.schema';


@Injectable()
export class JwtStrategy extends
PassportStrategy(Strategy) {
	constructor(
            @InjectModel(User.name)
            private userModel: Model<User>,
        ) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
            const user = await this.userModel.findById(payload.sub);

            if (!user) {
                throw new UnauthorizedException('User is not found');
            }

            if (!user.isAdmin) {
                throw new UnauthorizedException('Access Revoked');
            }
		return {
                    userId: user._id,
                    role: user.role,
                };
	}
}
