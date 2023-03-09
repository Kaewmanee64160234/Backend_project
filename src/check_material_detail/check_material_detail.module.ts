import { Module } from '@nestjs/common';
import { CheckMaterialDetailService } from './check_material_detail.service';
import { CheckMaterialDetailController } from './check_material_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckMaterialDetail } from './entities/check_material_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckMaterialDetail])],
  controllers: [CheckMaterialDetailController],
  providers: [CheckMaterialDetailService]
})
export class CheckMaterialDetailModule {}
