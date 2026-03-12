import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

// Extend Express Request type to include 'user'
declare module 'express-serve-static-core' {
  interface Request {
    user?: { userId: string; email: string };
  }
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto.name, dto.email, dto.password);
  }

  // This is called by your frontend’s verify page
  @Get('verify-email')
  async verify(@Query('token') token: string) {
    return this.auth.verifyEmail(token);
  }

  //@Post('verify-email')
  //verifyEmail(@Body() body) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    // set by JwtStrategy.validate()
    const user = req.user as { userId: string; email: string };
    return this.auth.me(user.userId);
  }

    @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.auth.forgotPassword(email);
  }

  @Get('reset-password')
  async verifyResetToken(@Query('token') token: string) {
    return this.auth.verifyResetToken(token);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string; confirmPassword: string }) {
    return this.auth.resetPassword(body.token, body.password, body.confirmPassword);
  }
}
