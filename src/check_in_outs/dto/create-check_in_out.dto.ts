import { IsNotEmpty } from 'class-validator';

export class CreateCheckInOutDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time_in: string;

  @IsNotEmpty()
  time_out: string;

  @IsNotEmpty()
  total_hour: number;
}
