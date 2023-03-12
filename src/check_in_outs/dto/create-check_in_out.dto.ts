import { IsNotEmpty } from 'class-validator';
import { Employee } from 'src/employees/entities/employee.entity';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';

export class CreateCheckInOutDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time_in: string;

  @IsNotEmpty()
  time_out: string;
  @IsNotEmpty()
  employeeId?: number;
  @IsNotEmpty()
  total_hour?: number;
  @IsNotEmpty()
  employee?: Employee;
  @IsNotEmpty()
  summary_salary?: SummarySalary;
  @IsNotEmpty()
  createdDate?: Date;
  @IsNotEmpty()
  updatedDate?: Date;
  @IsNotEmpty()
  deletedDate?: Date;
}
