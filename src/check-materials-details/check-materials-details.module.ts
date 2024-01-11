import { Module } from '@nestjs/common';
import { CheckMaterialsDetailsService } from './check-materials-details.service';
import { CheckMaterialsDetailsController } from './check-materials-details.controller';

@Module({
  controllers: [CheckMaterialsDetailsController],
  providers: [CheckMaterialsDetailsService]
})
export class CheckMaterialsDetailsModule {}
