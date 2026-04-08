import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
      @InjectModel(Product.name)
      private productModule: Model<Product>,
  ){}

  create(createProductDto: CreateProductDto) {
    const product = new this.productModel.create(createProductDto);

    product.isOutOfStock = product.quantityAvilable <= 0;

    return product.save();
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);

    Object.assign(product, updateDto);

    product.isAvailable = product.quantityAvailable <= 0;

    return product.save();
    return `This action updates a #${id} product`;
  }

  async orderProducts(id: string, quantity: number) {
      const product = await this.productModel.findById(id);

      product.quantityAvailable -= quantity;
      product.quantityOrdered += quantity;

      if (!product){
          throw new BadRequestException('Product not found');
      }

      if (product.quantityAvailable < quantity) {
          throw new BadRequestException('Not enough stock');
      }

      product.save();

      return product;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
