import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateSummarySalaryDto {
  @IsNotEmpty()
  id?: number;
  @IsNotEmpty()
  @Min(0)
  ss_date: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  hour: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  salary: number;
}
