import { Module } from '@nestjs/common';
import { CheckMaterialService } from './check_material.service';
import { CheckMaterialController } from './check_material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckMaterial } from './entities/check_material.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckMaterial, Employee])],
  controllers: [CheckMaterialController],
  providers: [CheckMaterialService],
})
export class CheckMaterialModule {}
