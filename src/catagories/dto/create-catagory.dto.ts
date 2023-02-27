import { IsNotEmpty, Length } from 'class-validator';

export class CreateCatagoryDto {
  @IsNotEmpty()
  @Length(3, 32)
  name: string;
}
