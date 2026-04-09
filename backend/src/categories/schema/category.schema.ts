import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Category {
	@Prop()
	id: string;

	@Prop({ required: true })
	name: string;
}
