import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepositiry: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const user = await this.customersRepositiry.save(createCustomerDto);
    return user;
  }

  async findAll() {
    const users = await this.customersRepositiry.find();
    return users;
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
  findCustomerByTel(tel: string) {
    try {
      const customer = this.customersRepositiry.findOne({
        where: { tel: tel },
      });
      return customer;
    } catch (errr) {
      console.log(errr);
    }
  }
}
