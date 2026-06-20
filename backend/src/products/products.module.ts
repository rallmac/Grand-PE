import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schema/product.schema';
import { OrdersService } from '../orders/orders.service';
import { OrdersController } from '../orders/orders.controller';
import { Order, OrderSchema } from '../orders/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [ProductsController, OrdersController],
  providers: [ProductsService, OrdersService],
  exports: [ProductsService],
})
export class ProductsModule {}

