import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
  ) {}
  create(createBillDto: CreateBillDto) {
    return this.billsRepository.save(createBillDto);
  }

  findAll() {
    return this.billsRepository.find();
  }

  async findOne(id: number) {
    const bill = await this.billsRepository.findOneBy({ id: id });
    if (!bill) {
      throw new NotFoundException('Bill not found');
    } else {
      return bill;
    }
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
