import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsNotEmpty()
  @Length(3, 64)
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('TH')
  tel: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  hourly: number;

  image = 'no_image.jpg';
}
