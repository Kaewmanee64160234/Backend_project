import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Catagory } from 'src/catagories/entities/catagory.entity';
import { CatagoriesModule } from 'src/catagories/catagories.module';
import { ToppingsController } from './toppings.controller';
import { ToppingsService } from './toppings.service';
import { Topping } from './entities/topping.entity';

@Module({
  imports: [CatagoriesModule, TypeOrmModule.forFeature([Catagory, Topping])],
  controllers: [ToppingsController],
  providers: [ToppingsService], // Remove ToppingModule from providers
})
export class ToppingsModule {}
