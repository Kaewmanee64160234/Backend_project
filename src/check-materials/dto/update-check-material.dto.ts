import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckMaterialDto } from './create-check-material.dto';

export class UpdateCheckMaterialDto extends PartialType(CreateCheckMaterialDto) {}
