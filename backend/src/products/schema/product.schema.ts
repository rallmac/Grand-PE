import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Category } from '../../category/schema/category.schema';


@Schema()
export class Product {
	@Prop({ type: autoincrement })
	id : string;

	@Prop({ required: true })
	name : string;

	@Prop({ required: true })
	description : string;

	@Prop({
            type: Types.ObjectId,
            ref: 'Category',
            required: true
        })
	category : Category | Types.ObjectId;

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
