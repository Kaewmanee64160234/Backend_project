import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from 'src/reports/reports.service';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), ReportsModule],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
