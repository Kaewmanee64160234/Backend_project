import { IsNotEmpty, Length } from 'class-validator';
import { Catagory } from 'src/catagories/entities/catagory.entity';

export class CreateToppingDto {
  id: number;
  @IsNotEmpty()
  @Length(3, 32)
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  category: Catagory;
}
