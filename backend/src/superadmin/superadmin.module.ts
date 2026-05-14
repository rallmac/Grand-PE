import { Module } from '@nestjs/common';
import { SuperadminService } from './superadmin.service';
import { SuperadminController } from './superadmin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../admin/schema/admin.schema';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { SuperAdmin, SuperAdminSchema } from './schema/superadmin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema, },
      { name: SuperAdmin.name, schema: SuperAdminSchema, },
    ]),
    EmailModule,
    JwtModule.register({}),
  ],
  providers: [SuperadminService],
  controllers: [SuperadminController],
})
export class SuperadminModule {}
