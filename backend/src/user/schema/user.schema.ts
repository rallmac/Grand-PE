import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
	@Prop()
	name: string;
	email: string;
	password: { type: String, select: false };
	isVerified: boolean;
	verificationToken?: string;
	verificationTokenExpires?: Date;
	lastVerificationEmailSent?: Date;
	resetPasswordToken?: string;
	resetPasswordExpires?: Date;
	lastResetEmailSent?: Date;
	refreshToken?: string;
	refreshTokens?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);