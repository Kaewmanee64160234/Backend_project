import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-Bill.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { DataSource, Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';
import { Material } from 'src/materials/entities/material.entity';
import { CreateMaterialDto } from 'src/materials/dto/create-material.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
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
      if (mat) {
        console.log(' found');
        const bill_detail = new BillDetail();
        bill_detail.name = od.name;
        bill_detail.price = od.price;
        bill_detail.amount = od.amount;
        bill_detail.bill = bill; // อ้างกลับ
        bill_detail.material = mat;
        bill_detail.total = bill_detail.price * bill_detail.amount;

        await this.billDetailRepository.save(bill_detail);
      }
    }
    await this.billsRepository.save(bill); // ได้ id
    return await this.billsRepository.findOne({
      where: { id: bill.id },
      relations: ['bill_detail'],
    });
  }

  findAll() {
    return this.billsRepository.find({
      // relations: ['employee', 'bill_detail', 'bill_detail.material'],
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
    let mat = new Material();
    for (const od of updateBillDto.bill_detail) {
      const material = await this.materialsRepository.findOne({
        where: { name: od.name },
        relations: ['bill_detail'],
      });
      console.log(material);
      if (material) {
        mat = material;
        mat.quantity =
          parseInt(od.amount + '') + parseInt(material.quantity + '');
        console.log(material.quantity);
        mat.min_quantity =
          parseInt(od.amount + '') + parseInt(material.min_quantity + '');
        console.log(material.min_quantity);
        mat.pricePerUnit = od.price;
        await this.materialsRepository.save(mat);
      } else {
      }
    }
    return {
      status: 'Finish',
    };
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
  showBillAll = async (id: string) => {
    const mat = await this.materialsRepository.findOne({ where: { id: +id } });
    const bills = this.billDetailRepository.find({
      where: { name: mat.name },
      relations: ['bill.bill_detail'],
    });
    return bills;
  };
}
