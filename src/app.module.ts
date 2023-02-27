import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CatagoriesModule } from './catagories/catagories.module';
<<<<<<< HEAD
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [ProductsModule, CatagoriesModule, StoresModule],
=======
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ProductsModule, CatagoriesModule, CustomersModule],
>>>>>>> 5ee02ad42c5d4024fdad7680e84fcb1f54d348dc
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
