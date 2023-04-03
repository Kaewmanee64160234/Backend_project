import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  min_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  quantity: number;

  @IsNotEmpty()
  unit: string;

  @IsNotEmpty()
  @Min(0)
  price_per_unit: number;

  @IsNotEmpty()
  bill_detail: BillDetail[];
}
