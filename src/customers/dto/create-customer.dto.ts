import {
  IsNotEmpty,
  Length,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  Min,
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
  @Min(0)
  point: number;
}
