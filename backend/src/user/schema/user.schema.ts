import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop()
  profilePicture: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default:false })
  isAdmin: boolean;

  @Prop()
  verificationToken?: string;

  @Prop()
  verificationTokenExpires?: Date;

  @Prop()
  lastVerificationEmailSent?: Date;

  @Prop()
  resetPasswordToken?: string;

  @Prop()
  resetPasswordExpires?: Date;

  @Prop()
  lastResetEmailSent?: Date;

  @Prop()
  refreshToken?: string;

  @Prop({ type: [String] })
  refreshTokens?: string[];

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Prop({
      default: '',
  })
  profilePhoto: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
