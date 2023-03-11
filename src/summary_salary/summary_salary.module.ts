import { Module } from '@nestjs/common';
import { SummarySalaryService } from './summary_salary.service';
import { SummarySalaryController } from './summary_salary.controller';
import { CheckInOutsModule } from 'src/check_in_outs/check_in_outs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummarySalary } from './entities/summary_salary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SummarySalary])],
  controllers: [SummarySalaryController],
  providers: [SummarySalaryService],
})
export class SummarySalaryModule {}
