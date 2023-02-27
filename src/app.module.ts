import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CatagoriesModule } from './catagories/catagories.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ProductsModule, CatagoriesModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
