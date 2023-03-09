import { Module } from '@nestjs/common';
import { CheckMaterialService } from './check_material.service';
import { CheckMaterialController } from './check_material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckMaterial } from './entities/check_material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckMaterial])],
  controllers: [CheckMaterialController],
  providers: [CheckMaterialService]
})
export class CheckMaterialModule {}
