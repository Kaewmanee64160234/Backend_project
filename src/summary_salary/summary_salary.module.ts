import { Module } from '@nestjs/common';
import { SummarySalaryService } from './summary_salary.service';
import { SummarySalaryController } from './summary_salary.controller';

@Module({
  controllers: [SummarySalaryController],
  providers: [SummarySalaryService],
})
export class SummarySalaryModule {}
