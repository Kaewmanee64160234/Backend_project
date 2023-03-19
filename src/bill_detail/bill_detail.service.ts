import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDetail } from './entities/bill_detail.entity';
import { Repository } from 'typeorm';
import { Material } from 'src/materials/entities/material.entity';
import { Bill } from 'src/bills/entities/bill.entity';

@Injectable()
export class BillDetailService {
  constructor(
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
  ) {}
  async create(createBillDetailDto: CreateBillDetailDto) {
    const material = await this.materialsRepository.findOneBy({
      id: createBillDetailDto.materialId,
    });
    const bill = await this.billsRepository.findOneBy({
      id: createBillDetailDto.billId,
    });
    const employee = await this.billsRepository.findOne({
      relations: ['bill_detail', 'bill_detail.bill'],
      where: {
        bill_detail: { bill: { id: createBillDetailDto.billId } },
      },
    });
    const bill_detail: BillDetail = new BillDetail();
    bill_detail.name = createBillDetailDto.name;
    bill_detail.amount = createBillDetailDto.amount;
    bill_detail.price = createBillDetailDto.price;
    bill_detail.total = createBillDetailDto.total;
    bill_detail.material = material;
    bill_detail.bill = bill;
    bill_detail.bill = employee;
    return this.billDetailRepository.save(bill_detail);
  }

  findAll() {
    return this.billDetailRepository.find({
      relations: ['bill', 'material', 'bill.employee'],
    });
  }

  findOne(id: number) {
    const bill_detail = this.billDetailRepository.findOne({
      where: { id: id },
      relations: ['bill', 'material', 'bill.employee'],
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
