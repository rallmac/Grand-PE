import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class AdminAllowList{
	@Prop()
	id: string;

	@Prop({ required: true })
	email: string;
}