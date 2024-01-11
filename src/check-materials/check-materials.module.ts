import { Module } from '@nestjs/common';
import { CheckMaterialsService } from './check-materials.service';
import { CheckMaterialsController } from './check-materials.controller';

@Module({
  controllers: [CheckMaterialsController],
  providers: [CheckMaterialsService]
})
export class CheckMaterialsModule {}
