import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckMaterialsDetailDto } from './create-check-materials-detail.dto';

export class UpdateCheckMaterialsDetailDto extends PartialType(CreateCheckMaterialsDetailDto) {}
