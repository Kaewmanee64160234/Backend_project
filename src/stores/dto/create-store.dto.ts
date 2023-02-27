import { IsNotEmpty, Length, Min, IsPhoneNumber } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @Length(3, 64)
  name: string;

  @IsNotEmpty()
  @Length(3, 64)
  address: string;

  @IsNotEmpty()
  @Min(13)
  @IsPhoneNumber('TH')
  tel: string;
}
