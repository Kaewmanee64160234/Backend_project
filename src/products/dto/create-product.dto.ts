import { IsNotEmpty, Length, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 32)
  name: string;

  type: string;

  size: string;

  @IsNumber()
  @Min(0)
  price: number;
}
