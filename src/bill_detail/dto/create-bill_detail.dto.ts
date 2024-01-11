import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
import { Topping } from 'src/toppings/entities/topping.entity';

export class CreateBillDetailDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @Min(0)
  total: number;

  @IsNotEmpty()
  materialId: number;

  @IsNotEmpty()
  billId: number;
  length: any;
  @IsNotEmpty()
  productId: number;
}
