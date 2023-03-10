import { Module } from '@nestjs/common';
import { CheckInOutsService } from './check_in_outs.service';
import { CheckInOutsController } from './check_in_outs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInOut } from './entities/check_in_out.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckInOut])],
  controllers: [CheckInOutsController],
  providers: [CheckInOutsService],
  exports: [CheckInOutsModule],
})
export class CheckInOutsModule {}
