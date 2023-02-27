import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CatagoriesModule } from './catagories/catagories.module';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers/entities/customer.entity';
import { Product } from './products/entities/product.entity';
import { Catagory } from './catagories/entities/catagory.entity';
import { DataSource } from 'typeorm';
import { Material } from './materials/entities/material.entity';
import { MaterialsModule } from './materials/materials.module';
@Module({
  imports: [
    ProductsModule,
    CatagoriesModule,
    CustomersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Customer, Product, Catagory, Material],
      synchronize: true,
      logging: false,
      subscribers: [],
      migrations: [],
    }),
    MaterialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
