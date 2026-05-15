import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../user/enums/role.enum';


export type SuperAdminDocument = HydratedDocument<SuperAdmin>;

@Schema({ timestamps: true })
export class SuperAdmin {
  
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({ default: true })
  isVerified: boolean;

  @Prop({ default: true })
  isSuperAdmin: boolean;

  @Prop({
    type: [String],
    default: [],
  })
  refreshTokens: string[];

  @Prop({
    type: String,
    enum: Role,
    default: Role.SUPERADMIN,
  })
  role: Role;
}

export const SuperAdminSchema =
  SchemaFactory.createForClass(SuperAdmin);
