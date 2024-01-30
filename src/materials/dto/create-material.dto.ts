import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  min_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNotEmpty()
  unit: string;

  image = 'no_image.jpg';
}
