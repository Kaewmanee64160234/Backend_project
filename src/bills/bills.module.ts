import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';
import { Material } from 'src/materials/entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Employee, BillDetail, Material])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
