import { PartialType } from '@nestjs/mapped-types';
import { CreateSummarySalaryDto } from './create-summary_salary.dto';

export class UpdateSummarySalaryDto extends PartialType(
  CreateSummarySalaryDto,
) {}
