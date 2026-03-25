import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from '../user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from '../email/email.service';
import { StringValue } from 'ms';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
    ]),
  
    ConfigModule,
    PassportModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' as StringValue }
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailService],
})
export class AuthModule {}
