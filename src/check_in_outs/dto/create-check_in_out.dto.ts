import { IsNotEmpty } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';

export class CreateCheckInOutDto {
  id?: number;
  date?: Date;
  time_in?: Date;
  time_out?: Date;
  @IsNotEmpty()
  employeeId: number;
  total_hour?: number;
  employee?: Employee;
  summary_salary?: SummarySalary;
  createdDate?: Date;
  updatedDate?: Date;
  deletedDate?: Date;
}
