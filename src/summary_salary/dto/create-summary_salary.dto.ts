import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { CheckInOut } from 'src/check_in_outs/entities/check_in_out.entity';

export class CreateSummarySalaryDto {
  @IsNotEmpty()
  id?: number;
  @IsNotEmpty()
  @Min(0)
  ss_date: Date;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  hour: number;
  @IsNotEmpty()
  employeeId?: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  salary?: number;
  @IsNotEmpty()
  checkInOut?: CheckInOut[];
  @IsNotEmpty()
  createdAt?: Date;
  @IsNotEmpty()
  updatedAt?: Date;
  @IsNotEmpty()
  deletedAt?: Date;
}
