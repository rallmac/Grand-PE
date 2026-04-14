import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product, ProductDocument } from '../products/schema/product.schema';
import { Order, OrderDocument } from './schema/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<ProductDocument>,

        @InjectModel(Order.name)
        private orderModel: Model<OrderDocument>,
    ) {}

    create(createOrderDto: CreateOrderDto) {
        return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async createOrder(userId: string, items: any[]) {
      let total = 0;

      for (const item of items) {
          const product = await this.productModel.findById(item.product);

          if(!product) throw new NotFoundException('Product not found');

          if(product.quantityAvailable < item.quantity) {
              throw new BadRequestException('Insuficient stock');
          }

          product.quantityAvailable -= item.quantity;
          product.quantityOrdered += item.quantity;

          total += product.price = item.quantity;

          await product.save();
      }

      return this.orderModel.create({
          user: new Types.ObjectId(userId),
          items,
          totalAmount: total,
      });
  }
}
