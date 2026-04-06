import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Product {
	@Prop({ type: autoincrement })
	id : string;

	@Prop({ required: true })
	name : string;

	@Prop({ required: true })
	description : string;

	@Prop({ required: true })
	category : string;

	@Prop({ required: true })
	image : string;

	@Prop({ required: true })
	price : number;

	@Prop()
	quantityAvailable : number;

	@Prop()
	quantityOrdered : number;

	@Prop({ default: false })
	isOutOfStock : boolean;

	@Prop()
	createdAt : Date;
}