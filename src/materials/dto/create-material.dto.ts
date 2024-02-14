import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';

export class CreateMaterialDto {
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  min_quantity: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  unit: string;

  image = 'no_image.jpg';
}
