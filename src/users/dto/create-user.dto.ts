import { IsNotEmpty, Length, Matches } from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @Length(3,64)
  username: string;

  @IsNotEmpty()
  @Length(3,64)
  login: string;
  
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,)
  password: string;

}