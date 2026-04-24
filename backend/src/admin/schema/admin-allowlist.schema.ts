import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Admin{
	@Prop({ required: true, unique: true })
	email: string;
}

export const AdminSchema =
SchemaFactory.createForClass(Admin);