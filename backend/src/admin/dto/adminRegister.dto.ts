import { IsEmail, IsString } from 'class-validator';


export class AdminRegisterDto{
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  userName: string;

  @IsString()
  address: string;
}