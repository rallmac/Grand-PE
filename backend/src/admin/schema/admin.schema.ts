import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Admin {
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

  @Prop({ default: false })
  isApproved: boolean; // Superadmin control

  @Prop({
    type: String,
    enum: ['admin'],
    default: 'admin',
  })
  role: string;

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

  @Prop({ default: 0, select: false })
  loginAttempts: number;

  @Prop({ type: Date, default: null })
  lockUntil: Date | null;

  @Prop({ default: Date.now })
  lastActivity: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

