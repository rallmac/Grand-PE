import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends
PassportStrategy(Strategy) {
	constructor() {
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
