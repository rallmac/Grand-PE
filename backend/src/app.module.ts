import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CleanupService } from './cleanup/cleanup.service';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';
import { CategoriesModule } from './categories/categories.module';
import { PaymentModule } from './payment/payment.module';
import { OrdersModule } from './orders/orders.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGODB_URI'),
      }),
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    ProductsModule,
    AdminModule,
    CategoriesModule,
    OrdersModule,
    PaymentModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, CleanupService],
})
export class AppModule {}