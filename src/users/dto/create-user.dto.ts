import {
  IsNotEmpty,
  Length,
  Matches,
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsPositive,
  Min,
  IsBoolean,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 64)
  username: string;
  telEmployee: string;
  @IsNotEmpty()
  @Length(3, 64)
  @IsEmail()
  login: string;
  addressEmployee: string;
  @IsNotEmpty()
  role: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('TH')
  tel: string;
  @IsNotEmpty()
  @IsPositive()
  @Min(9000)
  salary: number;
  @IsNotEmpty()
  @Length(3, 64)
  address: string;
  @IsNotEmpty()
  @IsBoolean()
  fullTime: boolean;
  @IsNotEmpty()
  @Length(3, 64)
  name_employee: string;
  @IsNotEmpty()
  @Length(6, 64)
  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  // )
  password: string;

  @IsNotEmpty()
  hourly: number;

  @IsNotEmpty()
  @IsString()
  position?: string;

  image = 'no_image.jpg';
}