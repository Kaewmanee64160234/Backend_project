import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.customerId,
    });
    const order: Order = new Order();
    order.customer = customer;
    order.amount = 0;
    order.total = 0;
    await this.ordersRepository.save(order); // ได้ id

    for (const od of createOrderDto.orderItems) {
      const orderItem = new OrderItem();
      orderItem.amount = od.amount;
      orderItem.product = await this.productsRepository.findOneBy({
        id: od.productId,
      });
      orderItem.name = orderItem.product.name;
      orderItem.price = orderItem.product.price;
      orderItem.total = orderItem.price * orderItem.amount;
      orderItem.order = order; // อ้างกลับ
      await this.orderItemsRepository.save(orderItem);
      order.amount = order.amount + orderItem.amount;
      order.total = order.total + orderItem.total;
    }
    await this.ordersRepository.save(order); // ได้ id
    return await this.ordersRepository.findOne({
      where: { id: order.id },
      relations: ['orderItems'],
    });
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
}
