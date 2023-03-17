import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-Bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
    @InjectRepository(Employee)
    private employeesRepositiry: Repository<Employee>,
  ) {}
  async create(createBillDto: CreateBillDto) {
    const employee = await this.employeesRepositiry.findOneBy({
      id: createBillDto.employeeId,
    });
    const bill: Bill = new Bill();
    bill.employee = employee;
    bill.name = createBillDto.name;
    bill.date = createBillDto.date;
    bill.time = createBillDto.time;
    bill.total = createBillDto.total;
    bill.buy = createBillDto.buy;
    bill.change = createBillDto.change;
    return await this.billsRepository.save(bill);
  }

  findAll() {
    return this.billsRepository.find({ relations: ['employee'] });
  }

  async findOne(id: number) {
    const bill = this.billsRepository.findOne({
      where: { id: id },
      relations: ['employee'],
    });
    if (!bill) {
      throw new NotFoundException();
    }
    return this.billsRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    const bill = await this.billsRepository.findOneBy({ id: id });
    if (!bill) {
      throw new NotFoundException();
    }
    const updatedBill = { ...bill, ...updateBillDto };
    return this.billsRepository.save(updatedBill);
  }

  async remove(id: number) {
    const bill = await this.billsRepository.findOne({
      where: { id: id },
    });
    if (!bill) {
      throw new NotFoundException();
    } else {
      await this.billsRepository.softRemove(bill);
    }
    return bill;
  }
}
