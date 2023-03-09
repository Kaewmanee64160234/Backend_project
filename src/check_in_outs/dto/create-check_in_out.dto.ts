import { IsNotEmpty } from 'class-validator';

export class CreateCheckInOutDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time_in: number;

  @IsNotEmpty()
  time_out: number;

  @IsNotEmpty()
  total_hour: number;
}
