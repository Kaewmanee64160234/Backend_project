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
  @IsString()
  @Length(3, 100)
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('TH')
  tel: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  point: number;
}
