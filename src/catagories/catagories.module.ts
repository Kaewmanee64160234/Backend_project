import { Module } from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import { CatagoriesController } from './catagories.controller';
import { Catagory } from './entities/catagory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Catagory])],
  controllers: [CatagoriesController],
  providers: [CatagoriesService],
})
export class CatagoriesModule {}
