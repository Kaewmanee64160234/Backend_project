import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CatagoriesModule } from './catagories/catagories.module';

@Module({
  imports: [ProductsModule, CatagoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
