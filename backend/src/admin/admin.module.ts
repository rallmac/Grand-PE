import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import {
    Admin,
    AdminSchema
} from './schema/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
      MongooseModule.forFeature([
          { name: Admin.name, schema: AdminSchema },
      ]),
      EmailModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [MongooseModule],
})
export class AdminModule {}
