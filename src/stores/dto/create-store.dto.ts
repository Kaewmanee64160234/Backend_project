import {
  IsNotEmpty,
  Length,
  IsString,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber('TH')
  @IsString()
  tel: string;
}
