import { IsNotEmpty, IsString, Length } from 'class-validator';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';

export class CreateBillDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  date: Date;

  time: Date;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  buy: number;

  @IsNotEmpty()
  change: number;

  @IsNotEmpty()
  employeeId: number;

  @IsNotEmpty()
  bill_detail: BillDetail[];
}
