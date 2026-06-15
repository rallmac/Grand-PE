import { IsString, IsNotEmpty } from 'class-validator';


export class CreateCategoryDto {

	@IsString()
	@IsNotEmpty()
	Id: string;

	@IsString()
	@IsNotEmpty()
	name: string;
}
