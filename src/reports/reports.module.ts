import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { CatagoriesModule } from 'src/catagories/catagories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Catagory } from 'src/catagories/entities/catagory.entity';

@Module({
  imports: [CatagoriesModule, TypeOrmModule.forFeature([Product, Catagory])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
