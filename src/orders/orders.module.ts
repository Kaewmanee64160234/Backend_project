import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Customer, Product]),
    ReportsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
