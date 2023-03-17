import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
export class CreateCheckMaterialDetailDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name_material: string;

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
  @IsNumber()
  @Min(1)
  qty_last: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  qty_remain: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  qty_expire: number;

  @IsNotEmpty()
  materialId: number;

}
