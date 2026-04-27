import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isApproved: boolean;

  @Prop({ select: false })
  verificationToken?: string;

  @Prop({ select: false })
  verificationTokenExpires?: Date;

  @Prop({ select: false })
  resetPasswordToken?: string;

  @Prop({ select: false })
  resetPasswordExpires?: Date;

  @Prop({ select: false })
  refreshToken?: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
