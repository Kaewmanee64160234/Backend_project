import { PartialType } from '@nestjs/mapped-types';
import { CreateBillDetailDto } from './create-bill_detail.dto';

export class UpdateBillDetailDto extends PartialType(CreateBillDetailDto) {}
