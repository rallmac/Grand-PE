import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';


@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productModel.create(createProductDto);

    product.isOutOfStock = product.quantityAvailable <= 0;

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

    Object.assign(product, UpdateProductDto);

    //product.isOutOfStock = product.quantityAvailable <= 0;

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product.save();
    return `This action updates a #${id} product`;
  }

  async orderProduct(id: string, quantity: number) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found!');
    }

    if (product.quantityAvailable < quantity) {
      throw new BadRequestException('Not enough stock');
    }

    product.quantityAvailable -= quantity;
    product.quantityOrdered += quantity;

    return product.save();

    //return product;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
