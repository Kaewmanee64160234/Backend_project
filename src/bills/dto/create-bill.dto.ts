import { IsNotEmpty } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  shop_name: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time: Date;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  buy: number;

  @IsNotEmpty()
  change: boolean;
}
