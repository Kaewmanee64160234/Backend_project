import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
  MIN,
  Min,
} from 'class-validator';
import { CheckInOut } from 'src/check_in_outs/entities/check_in_out.entity';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;
  @IsNotEmpty()
  @Min(9000)
  salary: number;
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
  checkInOut?: CheckInOut[];

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  hourly: number;

  @IsNotEmpty()
  @IsBoolean()
  fullTile: boolean;

  image = 'no_image.jpg';
}
