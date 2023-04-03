import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-Bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';
import { Material } from 'src/materials/entities/material.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,
    @InjectRepository(Employee)
    private employeesRepositiry: Repository<Employee>,
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}
  async create(createBillDto: CreateBillDto) {
    const employee = await this.employeesRepositiry.findOneBy({
      id: createBillDto.employeeId,
    });
    const bill: Bill = new Bill();
    bill.employee = employee;
    bill.name = createBillDto.name;
    bill.date = new Date();
    bill.time = new Date();
    bill.total = createBillDto.buy - createBillDto.change;
    bill.buy = createBillDto.buy;
    bill.change = createBillDto.change;
    await this.billsRepository.save(bill); //id employee

    for (const od of createBillDto.bill_detail) {
      const mat = await this.materialsRepository.findOne({
        where: { name: od.name },
        relations: ['bill_detail'],
      });
      const bill_detail = new BillDetail();
      bill_detail.name = od.name;
      bill_detail.price = od.price;
      bill_detail.amount = od.amount;
      bill_detail.total = bill_detail.price * bill_detail.amount;
      bill_detail.bill = bill; // อ้างกลับ
      bill_detail.material = mat;
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
      relations: ['employee', 'bill_detail', 'bill_detail.material'],
    });
  }

  async findOne(id: number) {
    const bill = this.billsRepository.findOne({
      where: { id: id },
      relations: ['employee', 'bill_detail', 'bill_detail.material'],
    });
    if (!bill) {
      throw new NotFoundException();
    }
    return this.billsRepository.findOne({ where: { id: id } });
  }

  async updateBill(updateBillDto: UpdateBillDto) {
    // const bill = await this.billsRepository.findOne({
    //   relations: ['employee', 'bill_detail'],
    //   where: { id: id },
    // });
    // if (!bill) {
    //   throw new NotFoundException();
    // }
    // const updatedBill = { ...bill, ...updateBillDto };
    // return this.billsRepository.save(updatedBill);
    // console.log(updateBillDto);
    for (const od of updateBillDto.bill_detail) {
      const material = await this.materialsRepository.findOne({
        where: { name: od.name },
        relations: ['bill_detail'],
      });
      console.log(material);
      if (material) {
        material.quantity =
          parseInt(od.amount + '') + parseInt(material.quantity + '');
        console.log(material.quantity);
        material.min_quantity =
          parseInt(od.amount + '') + parseInt(material.min_quantity + '');
        console.log(material.min_quantity);
        material.price_per_unit = od.price;
        await this.materialsRepository.save(material);
      } else {
        const billMat = new Material();
        billMat.name = od.name;
        billMat.min_quantity = od.amount;
        billMat.price_per_unit = od.price;
        billMat.quantity = od.amount;
        this.materialsRepository.create(billMat);
      }
      return material;
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
