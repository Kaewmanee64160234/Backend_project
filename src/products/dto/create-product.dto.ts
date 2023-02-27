import { IsNotEmpty, Length, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 32)
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
