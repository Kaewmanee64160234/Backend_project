import { Module } from '@nestjs/common';
import { CheckMaterialService } from './check_material.service';
import { CheckMaterialController } from './check_material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckMaterial } from './entities/check_material.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { CheckMaterialDetail } from 'src/check_material_detail/entities/check_material_detail.entity';
import { Material } from 'src/materials/entities/material.entity';



@Module({
  imports: [TypeOrmModule.forFeature([CheckMaterial, Employee, CheckMaterialDetail, Material])],
  controllers: [CheckMaterialController],
  providers: [CheckMaterialService],
})
export class CheckMaterialModule {}
