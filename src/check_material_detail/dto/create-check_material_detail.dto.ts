import { IsNotEmpty, IsNumber, IsString, Length, Min } from 'class-validator';
export class CreateCheckMaterialDetailDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  qty_last: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  qty_remain: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  qty_expire: number;

  @IsNotEmpty()
  materialId: number;

  @IsNotEmpty()
  checkmaterialID: number;
}
