import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
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

  update(id: number, updateBillDto: UpdateBillDto) {
    return `This action updates a #${id} bill`;
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
