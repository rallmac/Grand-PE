import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
	@Prop()
	name: string;
	email: string;
	password?: string;
	isVerified: boolean;
	verificationToken?: string;
	verificationTokenExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);