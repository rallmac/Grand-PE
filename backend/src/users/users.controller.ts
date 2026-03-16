import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';


@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req) {
    return this.userModel.find({}, '_id email').exec();
  }

  @Post
  createUser(@Body() createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
