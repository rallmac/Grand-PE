import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// ...existing code...
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { UsersController } from './users/users.controller';
import { User, UserSchema } from './users/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (cfg: ConfigService) => ({
            uri: cfg.get<string>('MONGODB_URI'),
        }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
    PaymentModule,
  ],
  controllers: [UsersController],
})
export class AppModule {}
