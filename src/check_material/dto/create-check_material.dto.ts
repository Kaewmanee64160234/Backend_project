import { IsNotEmpty } from 'class-validator';
export class CreateCheckMaterialDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time: Date;
}
