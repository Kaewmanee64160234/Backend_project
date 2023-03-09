import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CatagoriesModule } from 'src/catagories/catagories.module';
import { Catagory } from 'src/catagories/entities/catagory.entity';

@Module({
  imports: [CatagoriesModule, TypeOrmModule.forFeature([Product, Catagory])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
