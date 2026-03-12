import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;


@Schema({ timestamps: true })
export class User {
    @Prop({ default: 0 })
    points: number;
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true }) // bcrypt hash
    passwordHash: string;

    @Prop({ default: false })
    isVerified: boolean;

    // Email verification
    @Prop()
    verificationToken?: string;

    @Prop()
    verificationTokenExpires?: Date;

    // Password reset
    @Prop()
    resetToken?: string;

    @Prop()
    resetTokenExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
