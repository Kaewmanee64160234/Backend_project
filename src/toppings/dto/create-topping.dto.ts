import { IsNotEmpty, Length } from 'class-validator';

export class CreateToppingDto {
  id: number;
  @IsNotEmpty()
  @Length(3, 32)
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  catagoryId: number;
}
