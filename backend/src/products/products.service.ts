import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductSchema, ProductDocument } from './schema/product.schema';


@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create({
        ...createProductDto,
        category: new Types.ObjectId(createProductDto.category),
    });

    product.isOutOfStock = (product.quantityAvailable ?? 0) <= 0;

    return product.save();
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);

    if (!product) {
        throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateProductDto);

    product.isOutOfStock = product.quantityAvailable <= 0;

    return product.save();
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
