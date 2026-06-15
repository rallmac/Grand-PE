import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, } from 'passport-jwt';
import { User } from '../user/schema/user.schema';
import { Admin } from '../admin/schema/admin.schema';
import { SuperAdmin } from '../superadmin/schema/superadmin.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,

    @InjectModel(Admin.name)
    private adminModel: Model<Admin>,

    @InjectModel(SuperAdmin.name)
    private superAdminModel: Model<SuperAdmin>,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),

      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('JWT VALIDATE HIT');
    console.log('PAYLOAD:', payload);

    let account = null;

    switch (payload.type) {
      case 'user':
        account =
          await this.userModel.findById(
            payload.sub,
          );
        break;

      case 'admin':
        account =
          await this.adminModel.findById(
            payload.sub,
          );
        break;

      case 'superadmin':
        account =
          await this.superAdminModel.findById(
            payload.sub,
          );
        break;

      default:
        throw new UnauthorizedException(
          'Invalid role',
        );
    }

    if (!account) {
      throw new UnauthorizedException(
        'Account not found',
      );
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}