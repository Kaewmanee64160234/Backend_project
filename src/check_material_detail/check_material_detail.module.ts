import { Module } from '@nestjs/common';
import { CheckMaterialDetailService } from './check_material_detail.service';
import { CheckMaterialDetailController } from './check_material_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckMaterialDetail } from './entities/check_material_detail.entity';
import { Material } from 'src/materials/entities/material.entity';
import { CheckMaterial } from 'src/check_material/entities/check_material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckMaterialDetail, Material, CheckMaterial]),
  ],
  controllers: [CheckMaterialDetailController],
  providers: [CheckMaterialDetailService],
})
export class CheckMaterialDetailModule {}
