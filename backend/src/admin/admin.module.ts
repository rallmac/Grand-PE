import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import {
  AdminAllowlist,
  AdminAllowlistSchema
} from './schema/admin-allowlist.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdminAllowlist.name, schema: AdminAllowlistSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [MongooseModule],
})
export class AdminModule {}
