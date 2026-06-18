import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsMongoId,
  IsDateString,
  Min,
} from 'class-validator';


export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantityAvailable?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  quantityOrdered?: number;

  @IsOptional()
  @IsBoolean()
  isOutOfStock?: boolean;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;
}
