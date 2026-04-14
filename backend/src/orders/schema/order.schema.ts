import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'mongoose';
import { User } from '../../user/schema/user.schema';

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true})
    user: User | Type.ObjectId;

    @Prop([
        {
            product: {type: Types.ObjectId, ref: 'Product'},
            quantity: Number,
            price: Number,
        },
    ])
    items: {
        product: Types.ObjectId;
        quantity: number;
        price: number;
    }[];

    @Prop({required: true})
    totalAmount: number;

    @Prop({default: 'pending'})
    status: string; //pending | paid | shipped | delivered | cancelled
}

export type OrderDocument = Order + Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
