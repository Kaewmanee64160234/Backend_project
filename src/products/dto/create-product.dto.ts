import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @Length(3, 32)
  name: string;
  @IsNotEmpty()
  catagory_id: number;
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  // @IsNumber()
  // @Min(0)
  price: number;

  image = 'no_image.jpg';
}
