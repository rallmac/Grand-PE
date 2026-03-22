import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() body: any){
		const user = await this.authService.validateUser(
			body.email, body.password
			);
		return this.authService.login(user);
	}

	@Post('register')
	async register(@Body('email') email: string) {
		return this.authService.register(email);
	}

	@Get('verify')
	async verify(@Query('token') token: string){
		return this.authService.verifyEmail(token);
	}

	@Post('set-password')
	async setPassword(@Body() body: any) {
		return this.authService.setPassword(body.token, body.password)
	}

	@Post('resend-verification')
	async resendVerification(@Body('email') email: string) {
		return this.authService.resendVerification(email);
	}
}
