import { IsNotEmpty, Length, Matches, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 64)
  username: string;

  @IsNotEmpty()
  @Length(3, 64)
  @IsEmail()
  login: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @Length(6, 64)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;
}
