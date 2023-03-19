import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-Bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
    @InjectRepository(Employee)
    private employeesRepositiry: Repository<Employee>,
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
  ) {}
  async create(createBillDto: CreateBillDto) {
    console.log(createBillDto);
    const employee = await this.employeesRepositiry.findOneBy({
      id: createBillDto.employeeId,
    });
    console.log(employee);
    const bill: Bill = new Bill();
    bill.employee = employee;
    bill.name = createBillDto.name;
    bill.date = createBillDto.date;
    bill.time = createBillDto.time;
    bill.total = createBillDto.total;
    bill.buy = createBillDto.buy;
    bill.change = createBillDto.change;
    await this.billsRepository.save(bill);

    for (const od of createBillDto.bill_detail) {
      const bill_detail = new BillDetail();
      bill_detail.name = od.name;
      bill_detail.price = od.price;
      bill_detail.amount = od.amount;
      bill_detail.total = bill_detail.price * bill_detail.amount;
      bill_detail.bill = bill; // อ้างกลับ
      await this.billDetailRepository.save(bill_detail);
      bill.total = bill.total + bill_detail.total;
    }
    await this.billsRepository.save(bill); // ได้ id
    return await this.billsRepository.findOne({
      where: { id: bill.id },
      relations: ['bill_detail'],
    });
  }

  findAll() {
    return this.billsRepository.find({
      relations: ['employee', 'bill_detail'],
    });
  }

  async findOne(id: number) {
    const bill = this.billsRepository.findOne({
      where: { id: id },
      relations: ['employee', 'bill_detail'],
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
