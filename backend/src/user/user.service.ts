import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from './schema/user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // CREATE USER
  async create(
    createUserDto: CreateUserDto,
  ) {

    const user =
      new this.userModel(
        createUserDto,
      );

    return await user.save();
  }

  // FIND ALL USERS
  async findAll() {

    return await this.userModel.find();

  }

  // FIND ONE USER
  async findOne(id: string) {

    const user =
      await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  // UPDATE USER
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ) {

    const updatedUser =
      await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        {
          new: true,
        },
      );

    if (!updatedUser) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return updatedUser;
  }

  // DELETE USER
  async remove(id: string) {

    const deletedUser =
      await this.userModel.findByIdAndDelete(
        id,
      );

    if (!deletedUser) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return {
      success: true,
      message:
        'User deleted successfully',
    };
  }

  // UPDATE USERNAME
  async updateUsername(
    userId: string,
    username: string,
  ) {

    if (
      !username ||
      !username.trim()
    ) {
      throw new BadRequestException(
        'Username is required',
      );
    }

    // CHECK IF USERNAME EXISTS
    const existingUsername =
      await this.userModel.findOne({
        username,
      });

    if (
      existingUsername &&
      existingUsername._id.toString() !==
        userId
    ) {
      throw new BadRequestException(
        'Username already taken',
      );
    }

    // UPDATE USER
    const updatedUser =
      await this.userModel.findByIdAndUpdate(
        userId,
        {
          username,
        },
        {
          new: true,
        },
      );

    if (!updatedUser) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return {
      success: true,

      message:
        'Username updated successfully',

      user: {
        id: updatedUser._id,

        firstName:
          updatedUser.firstName,

        username:
          updatedUser.userName,

        email:
          updatedUser.email,

        profilePhoto:
          updatedUser.profilePhoto,
      },
    };
  }

  // UPDATE PROFILE PHOTO
  async updatePhoto(
    userId: string,
    file: Express.Multer.File,
  ) {

    if (!file) {
      throw new BadRequestException(
        'Profile photo is required',
      );
    }

    // TEMP LOCAL FILE PATH
    // LATER YOU CAN USE CLOUDINARY

    const profilePhoto =
      `/uploads/${file.filename}`;

    // UPDATE USER
    const updatedUser =
      await this.userModel.findByIdAndUpdate(
        userId,
        {
          profilePhoto,
        },
        {
          new: true,
        },
      );

    if (!updatedUser) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return {
      success: true,

      message:
        'Profile photo updated successfully',

      user: {
        id: updatedUser._id,

        firstName:
          updatedUser.firstName,

        username:
          updatedUser.userName,

        email:
          updatedUser.email,

        profilePhoto:
          updatedUser.profilePhoto,
      },
    };
  }
}
