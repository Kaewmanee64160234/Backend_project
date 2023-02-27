import {
  IsNotEmpty,
  Length,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
  @IsNotEmpty()
  @IsPhoneNumber('TH')
  tel: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  point: number;
}
