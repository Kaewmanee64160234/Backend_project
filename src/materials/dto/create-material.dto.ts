import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  min_quantity: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  unit: string;

  @IsNotEmpty()
  price_per_unit: number;
}
