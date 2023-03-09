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
import { Store } from './stores/entities/store.entity';
import { StoresModule } from './stores/stores.module';
import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/entities/employee.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BillsModule } from './bills/bills.module';
import { Bill } from './bills/entities/bill.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item';
import { CheckInOutsModule } from './check_in_outs/check_in_outs.module';
import { CheckInOut } from './check_in_outs/entities/check_in_out.entity';
import { SummarySalaryModule } from './summary_salary/summary_salary.module';

@Module({
  imports: [
    ProductsModule,
    CatagoriesModule,
    CustomersModule,
    StoresModule,
    UsersModule,
    EmployeesModule,
    OrdersModule,
    CheckInOutsModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'www.db4free.net',
      port: 3306,
      username: 'allforone',
      password: 'AllForOne@1234',
      database: 'dcoffee',
      entities: [
        Customer,
        Product,
        Catagory,
        Material,
        Store,
        Employee,
        User,
        Bill,
        Order,
        OrderItem,
        CheckInOut,
      ],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'database.sqlite',
    //   entities: [Customer, Product, Catagory, Material, Store, Employee, User],
    //   synchronize: true,
    //   logging: false,
    //   subscribers: [],
    //   migrations: [],
    // }),
    MaterialsModule,
    EmployeesModule,
    AuthModule,
    BillsModule,
    OrdersModule,
    CheckInOutsModule,
    SummarySalaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
