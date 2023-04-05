import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';
import { Between, LessThan, Like, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item';
import { Order } from './entities/order.entity';
import { startWith } from 'rxjs';
import { MaxDate, MinDate } from 'class-validator';
import { Roles } from 'src/authorize/roles.decorator';
import { Role } from 'src/types/Role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/authorize/roles.guard';

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
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(createOrderDto: CreateOrderDto) {
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.customerId,
    });
    const order: Order = new Order();
    order.customer = customer;
    order.discount = createOrderDto.discount;
    order.recieved = createOrderDto.recieved;
    order.change = createOrderDto.recieved - createOrderDto.total;
    order.payment = createOrderDto.payment;
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
      order.total = order.total + orderItem.total;
    }
    await this.ordersRepository.save(order); // ได้ id
    return await this.ordersRepository.findOne({
      where: { id: order.id },
      relations: ['orderItems'],
    });
  }
  @Roles(Role.Employee, Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(query) {
    const page = query.page || 1;
    const take = query.take || 10;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';
    const orderBy = query.orderBy || 'createdDate';
    const order = query.order || 'DESC';
    const currentPage = page;
    const dateMin = query.dateMin || '';
    const dateMax = query.dateMax || '';

    const [result, total] = await this.ordersRepository.findAndCount({
      where: { createdDate: Between(dateMin, dateMax) },
      order: { [orderBy]: order },
      relations: ['customer', 'orderItems'],

      take: take,
      skip: skip,
    });
    const lastPage = Math.ceil(total / take);
    return {
      data: result,
      count: total,
      currentPage: currentPage,
      lastPage: lastPage,
    };
  }
  findAllAsc() {
    return this.ordersRepository.find({
      relations: ['customer', 'orderItems'],
      order: { createdDate: 'ASC' },
    });
  }

  findOne(id: number) {
    return this.ordersRepository.findOne({
      where: { id: id },
      relations: ['customer', 'orderItems'],
    });
  }
  @Roles(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
  @Roles(Role.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(id: number) {
    const order = await this.ordersRepository.findOneBy({ id: id });
    return this.ordersRepository.softRemove(order);
  }
}
