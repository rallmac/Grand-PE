import {
	UseGuards,
	Controller,
	Post,
	Body,
	Delete,
	Get,
	UseInterceptors,
	UploadedFile,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { AdminRegisterDto } from './dto/adminRegister.dto';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { ProductsService } from '../products/products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('admin')
export class AdminController {
	constructor(
		private readonly adminService: AdminService,
		private readonly productsService: ProductsService,
	) {}

	@Post('register')
	async register(@Body() dto: AdminRegisterDto){
		return this.adminService.register(dto);
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

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin')
	@Get('admin-dashboard')
	getDashboard() {
		return {
			message: 'Welcome admin',
		};
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('admin')
	@Post('create-product')
	@UseInterceptors(FileInterceptor('image'))
	create(
	  @UploadedFile() image: Express.Multer.File,
	  @Body() createProductDto: CreateProductDto,
	) {
	  console.log('IMAGE:', image);
	  console.log('DTO:', createProductDto);

	  return this.productsService.create(createProductDto, image);
	}
}