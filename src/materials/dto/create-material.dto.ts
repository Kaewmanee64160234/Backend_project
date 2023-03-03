import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';

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
  @IsNumber()
  @Min(0)
  unit: number;

  @IsNotEmpty()
  @Min(0)
  price_per_unit: number;
}
