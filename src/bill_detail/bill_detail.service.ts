import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDetail } from './entities/bill_detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillDetailService {
  constructor(
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
  ) {}
  create(createBillDetailDto: CreateBillDetailDto) {
    return this.billDetailRepository.save(createBillDetailDto);
  }

  findAll() {
    return this.billDetailRepository.find({ relations: ['bill', 'material'] });
  }

  findOne(id: number) {
    const bill_detail = this.billDetailRepository.findOne({
      where: { id: id },
      relations: ['bill', 'material'],
    });
    if (!bill_detail) {
      throw new NotFoundException();
    }
    return this.billDetailRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateBillDetailDto: UpdateBillDetailDto) {
    const bill_detail = await this.billDetailRepository.findOneBy({ id: id });
    if (!bill_detail) {
      throw new NotFoundException();
    }
    const updatedBill_detail = { ...bill_detail, ...updateBillDetailDto };
    return this.billDetailRepository.save(updatedBill_detail);
  }

  async remove(id: number) {
    const bill_detail = await this.billDetailRepository.findOne({
      where: { id: id },
    });
    if (!bill_detail) {
      throw new NotFoundException();
    } else {
      await this.billDetailRepository.softRemove(bill_detail);
    }
    return bill_detail;
  }
}
