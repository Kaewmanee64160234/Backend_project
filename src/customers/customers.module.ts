import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), ReportsModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
