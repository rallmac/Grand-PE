import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class AdminAllowlist{

        @Prop()
	id: string;

        @Prop({ required: true })
	email: string;
}

export const AdminSchema = SchemaFactory.createForClass(AdminAllowlist);
