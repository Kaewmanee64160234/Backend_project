import { Module } from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { BillDetailController } from './bill_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillDetail } from './entities/bill_detail.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { Material } from 'src/materials/entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillDetail, Bill, Material])],
  controllers: [BillDetailController],
  providers: [BillDetailService],
})
export class BillDetailModule {}
