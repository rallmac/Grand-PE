import { UseGuards, Controller, Post, Body, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminService: AdminService
	) {}

	@Post('register')
	async register(@Body('email') email: string){
		return this.adminService.register(email);
	}

	@Post('login')
	async login(
		@Body('email') email: string,
		@Body('password') password: string
	){
		return this.adminService.login(email, password)
	}

	@Post('set-password')
	async setPassword(
		@Body('token') token: string,
		@Body('password') password: string
	){
		return this.adminService.setPassword(token, password)
	}

	@Post('reset-password')
	async resetPassword(
		@Body('token') token: string,
		@Body('password') password: string
	){
		return this.adminService.resetPassword(token, password)
	}
}
