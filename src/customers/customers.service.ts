import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { ReportsService } from 'src/reports/reports.service';

@Injectable()
export class CustomersService {
  reportsService: any;
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Customer)
    private readonly customersRepositiry: Repository<Customer>,
    private readonly reportRepository: ReportsService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const user = await this.customersRepositiry.save(createCustomerDto);
    // await this.reportRepository.regCustomer(user);
    return user;
  }

  async findAll(query) {
    const page = query.page || 1;
    const take = query.take || 10;
    const skip = (page - 1) * take;
    const keyword = query.keyword || '';
    const orderBy = query.orderBy || 'tel';
    const order = query.order || 'ASC';
    const currentPage = page;

    const [result, total] = await this.customersRepositiry.findAndCount({
      where: { tel: Like(`%${keyword}%`) },
      order: { [orderBy]: order },
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

  async findOne(id: number) {
    const customer = await this.customersRepositiry.findOneBy({ id: id });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    } else {
      return customer;
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customersRepositiry.findOneBy({ id: id });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    } else {
      const updatedCustomer = {
        ...customer,

        ...updateCustomerDto,
      };

      return this.customersRepositiry.save(updatedCustomer);
    }
  }

  async remove(id: number) {
    const customer = await this.customersRepositiry.findOne({
      where: { id: id },
    });
    if (!customer) {
      throw new NotFoundException();
    } else {
      await this.customersRepositiry.softRemove(customer);
    }
    return customer;
  }
  async upDatePointCustomer(
    id: string,
    point: number,
    updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.customersRepositiry.findOne({
      where: { id: parseInt(id) },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    updateCustomerDto.point += point;
    const customerUpdated = {
      ...customer,
      ...updateCustomerDto,
    };

    return this.customersRepositiry.save(customerUpdated);
  }
  async findCustomerByTel(tel: string) {
    try {
      const customer = await this.customersRepositiry.findOneBy({ tel: tel });
      if (customer) {
        return customer;
      } else {
        throw new NotFoundException();
      }
      // const customers = await this.dataSource.query(
      //   'SELECT * FROM customer WHERE customer_tel LIKE ?',
      //   [`%${tel}%`],
      // );
      // const customerList = new Array<Customer>();
      // for (let i = 0; i < customers.length; i++) {
      //   const customer = new Customer();
      //   customer.id = customers[i].customer_id;
      //   customer.name = customers[i].customer_name;
      //   customer.tel = customers[i].customer_tel;
      //   customer.point = customers[i].customer_point;
      //   customer.image = customers[i].image;
      //   customer.createdDate = customers[i].created_date;
      //   customer.updatedDate = customers[i].updated_date;
      //   customer.deletedDate = customers[i].deleted_date;
      //   customerList.push(customer);
      // }
      // return customerList;
    } catch (errr) {
      console.log(errr);
    }
  }
}
