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

import { EmployeesModule } from './employees/employees.module';
import { Employee } from './employees/entities/employee.entity';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CheckMaterialModule } from './check_material/check_material.module';
import { CheckMaterial } from './check_material/entities/check_material.entity';
import { BillsModule } from './bills/bills.module';
import { Bill } from './bills/entities/bill.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item';
import { CheckInOutsModule } from './check_in_outs/check_in_outs.module';
import { CheckInOut } from './check_in_outs/entities/check_in_out.entity';
import { BillDetailModule } from './bill_detail/bill_detail.module';
import { SummarySalaryModule } from './summary_salary/summary_salary.module';
import { BillDetail } from './bill_detail/entities/bill_detail.entity';
import { CheckMaterialDetailModule } from './check_material_detail/check_material_detail.module';
import { CheckMaterialDetail } from './check_material_detail/entities/check_material_detail.entity';
import { SummarySalary } from './summary_salary/entities/summary_salary.entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/entities/report.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { ToppingsModule } from './toppings/toppings.module';
import { Topping } from './toppings/entities/topping.entity';
// import { ToppingsProductsModule } from './toppings-products/toppings-products.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ProductsModule,
    CatagoriesModule,
    CustomersModule,
    UsersModule,
    EmployeesModule,
    OrdersModule,
    CheckInOutsModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: '',
      password: '',
      database: 'buucoffee',
      entities: [
        Customer,
        Product,
        Catagory,
        Material,
        Employee,
        User,
        Bill,
        Order,
        OrderItem,
        CheckInOut,
        CheckMaterial,
        BillDetail,
        CheckMaterialDetail,
        SummarySalary,
        Topping,
      ],
      synchronize: true,
    }),

    MaterialsModule,
    EmployeesModule,
    AuthModule,
    CheckMaterialModule,
    BillsModule,
    OrdersModule,
    CheckInOutsModule,
    BillDetailModule,
    SummarySalaryModule,
    CheckMaterialDetailModule,
    ReportsModule,
    ToppingsModule,
    // ToppingsProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
