import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { Material } from './entities/material.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckMaterialDetail } from 'src/check_material_detail/entities/check_material_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, CheckMaterialDetail])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
