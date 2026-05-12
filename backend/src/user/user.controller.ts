import {
  UseGuards, Controller,
  Get, Req, Post, Body,
  Patch, Put, Delete,
  Param, UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne('+id');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update('+id', updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove('+id');
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }


  @Put('update-username')
  @UseGuards(JwtAuthGuard)
  updateUsername(
    @Req() req,
    @Body('username') username: string,
    ) {
    return this.userService.updateUsername(
      req.user.userId,
      username,
      );
  }


  @Put('update-photo')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profilePhoto'))
  updatePhoto(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    ) {
    return this.userService.updatePhoto(
      req.user.userId,
      file,
      );
  }
}
