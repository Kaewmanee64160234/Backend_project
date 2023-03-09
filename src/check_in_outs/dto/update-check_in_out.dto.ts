import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckInOutDto } from './create-check_in_out.dto';

export class UpdateCheckInOutDto extends PartialType(CreateCheckInOutDto) {}
