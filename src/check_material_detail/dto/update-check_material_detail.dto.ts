import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckMaterialDetailDto } from './create-check_material_detail.dto';

export class UpdateCheckMaterialDetailDto extends PartialType(CreateCheckMaterialDetailDto) {}
