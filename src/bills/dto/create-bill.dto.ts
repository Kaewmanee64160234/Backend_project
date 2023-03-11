import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
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
  change: string;
}
