import { Module } from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { BillDetailController } from './bill_detail.controller';

@Module({
  controllers: [BillDetailController],
  providers: [BillDetailService]
})
export class BillDetailModule {}
