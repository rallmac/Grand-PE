import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class AdminAllowlist{
	@Prop({ required: true, unique: true })
	email: string;
}

export const AdminAllowlistSchema =
SchemaFactory.createForClass(AdminAllowlist);