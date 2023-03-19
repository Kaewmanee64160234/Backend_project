import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, SummarySalary])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
