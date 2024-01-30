import {
  IsNotEmpty,
  Length,
  IsNumber,
  IsPhoneNumber,
  Min,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @Length(3, 100)
  name: string;
  @IsNotEmpty()
  @IsPhoneNumber('TH')
  tel: string;
  @IsNotEmpty()
  point: number;
}
