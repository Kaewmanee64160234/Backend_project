import { IsNotEmpty, Length, IsString, IsPhoneNumber } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @Length(3, 64)
  name: string;

  @IsNotEmpty()
  @Length(3, 64)
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber('TH')
  @IsString()
  tel: string;
}
