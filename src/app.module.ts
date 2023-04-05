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
    //     TypeOrmModule.forRoot({
    //       type: 'mysql',
    //       host: 'www.db4free.net',
    //       port: 3306,
    //       username: 'allforone',
    //       password: 'AllForOne@1234',
    //       database: 'dcoffee',
    //       entities: [
    //         Customer,
    //         Product,
    //         Catagory,
    //         Material,
    //         Store,
    //         Employee,
    //         User,
    //         Bill,
    //         Order,
    //         OrderItem,
    //         CheckInOut,
    //         CheckMaterial,
    //         BillDetail,
    //         CheckMaterialDetail,
    //         SummarySalary,
    //       ],
    //       synchronize: true,
    //     }),

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'allforone',
    //   password: 'AllForOne@1234',
    //   database: 'dcoffee',
    //   entities: [
    //     Customer,
    //     Product,
    //     Catagory,
    //     Material,
    //     Store,
    //     Employee,
    //     User,
    //     Bill,
    //     Order,
    //     OrderItem,
    //     CheckInOut,
    //     CheckMaterial,
    //     BillDetail,
    //     CheckMaterialDetail,
    //     SummarySalary,
    //   ],
    //   synchronize: true,
    // }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'angsila.informatics.buu.ac.th',
      port: 3306,
      username: 'guest06',
      password: 'FSuGmPPk',
      database: 'guest06',
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
        CheckMaterial,
        BillDetail,
        CheckMaterialDetail,
        SummarySalary,
      ],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'www.db4free.net',
    //   port: 3306,
    //   username: 'allforone',
    //   password: 'AllForOne@1234',
    //   database: 'dcoffee',
    //   entities: [
    //     Customer,
    //     Product,
    //     Catagory,
    //     Material,
    //     Store,
    //     Employee,
    //     User,
    //     Bill,
    //     Order,
    //     OrderItem,
    //     CheckInOut,
    //     CheckMaterial,
    //     BillDetail,
    //     CheckMaterialDetail,
    //     SummarySalary,
    //   ],
    //   synchronize: true,
    // }),
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
    CheckMaterialModule,
    BillsModule,
    OrdersModule,
    CheckInOutsModule,
    BillDetailModule,
    SummarySalaryModule,
    CheckMaterialDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
