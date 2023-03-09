import { IsNotEmpty, Length, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 32)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;

  image: 'no_img_available.jpg';
}
