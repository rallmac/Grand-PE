import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from './schema/user.schema';



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    ) {}

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
    return 'This action adds a new user';
  }

  findAll() {
    return this.userModel.find();
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.userModel.findById(id);
    return `This action returns a user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    return `This action updates a user`;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
    return `This action removes a user`;
  }
}
