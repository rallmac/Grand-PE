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

  async create(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
    ) {
    const product = await this.productModel.create({
      ...createProductDto,
      image: image?.filename,
    });

    product.isOutOfStock = (product.quantityAvailable ?? 0) <= 0;

    return product.save();
  }

  async findAll(category?: string) {
    if (category){
      return this.productModel.find({ category });
    }

    return this.productModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findById(id);

    // FIRST: handle null
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // THEN: assign correctly
    Object.assign(product, updateProductDto);

    // Optional: recompute stock
    product.isOutOfStock = product.quantityAvailable <= 0;

    return product.save();
  }

}