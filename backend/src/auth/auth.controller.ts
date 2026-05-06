import { UseGuards, Controller, Post, Body, Get, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';

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
	async register(@Body() dto: RegisterDto) {
		console.log(dto)
		return this.authService.register(dto);
	}

	@Post('set-password')
	async setPassword(@Body() body: any) {
		return this.authService.setPassword(body.token, body.password)
	}

	@Post('resend-verification')
	async resendVerification(@Body('email') email: string) {
		return this.authService.resendVerification(email);
	}

	@Post('forgot-password')
	async forgotPassword(@Body('email') email: string) {
		return this.authService.forgotPassword(email);
	}

	@Post('reset-password')
	async resetPassword(@Body() body: any) {
		return this.authService.resetPassword(body.token, body.password);
	}

	@Post('resend-reset-password')
	async resendResetPassword(@Body('email') email: string) {
		return this.authService.resendResetPassword(email);
	}

	@Post('refresh')
	async refresh(@Body() body: any) {
		await this.authService.refresh(body.refresh_token);
	}

	
	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout(@Req() req) {
		const userId = req.user.sub;

		return this.authService.logout(userId);
	}
}
