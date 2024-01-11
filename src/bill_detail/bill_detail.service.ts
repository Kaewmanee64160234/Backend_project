import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDetail } from './entities/bill_detail.entity';
import { Repository } from 'typeorm';
import { Material } from 'src/materials/entities/material.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { Roles } from 'src/authorize/roles.decorator';
import { Role } from 'src/types/Role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/authorize/roles.guard';
import { Product } from 'src/products/entities/product.entity';
import { Topping } from 'src/toppings/entities/topping.entity';

@Injectable()
export class BillDetailService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,

    @InjectRepository(Topping) private toppingRepository: Repository<Topping>,
  ) {}
  @Roles(Role.Owner, Role.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(createBillDetailDto: CreateBillDetailDto) {
    const material = await this.materialsRepository.findOneBy({
      id: createBillDetailDto.materialId,
    });
    const bill = await this.billsRepository.findOneBy({
      id: createBillDetailDto.billId,
    });
    const employee = await this.billsRepository.findOne({
      relations: ['bill_detail', 'bill_detail.bill', 'bill_detail.material'],
      where: {
        billDetails: { bill: { id: createBillDetailDto.billId } },
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
    const product = await this.productRepository.findOne({
      where: { id: createBillDetailDto.productId },
    });
    bill_detail.product = product;

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

    const products = await this.productRepository.findOne({
      where: { id: updateBillDetailDto.productId },
    });
    const mate = await this.materialsRepository.findOne({
      where: { id: updateBillDetailDto.materialId },
    });
    // Update the billDetail entity with the new data
    this.billDetailRepository.merge(bill_detail, {
      name: updateBillDetailDto.name,
      amount: updateBillDetailDto.amount,
      price: updateBillDetailDto.price,
      total: updateBillDetailDto.total,
      material: mate,
      product: products, // assuming product is part of the DTO
    });

    // Save the updated billDetail entity
    return this.billDetailRepository.save(bill_detail);
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
