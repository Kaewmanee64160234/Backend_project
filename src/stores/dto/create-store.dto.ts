import { IsNotEmpty, Length, Min, IsPhoneNumber } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @Length(3, 64)
  name: string;

  @IsNotEmpty()
  @Length(3, 64)
  address: string;

  @IsNotEmpty()
  @IsPhoneNumber('TH')
  @Min(13)
  tel: string;
}
