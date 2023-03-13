import { Module } from '@nestjs/common';
import { CheckInOutsService } from './check_in_outs.service';
import { CheckInOutsController } from './check_in_outs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInOut } from './entities/check_in_out.entity';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckInOut, SummarySalary, Employee])],
  controllers: [CheckInOutsController],
  providers: [CheckInOutsService],
})
export class CheckInOutsModule {}
