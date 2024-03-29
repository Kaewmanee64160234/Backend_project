import { Customer } from 'src/customers/entities/customer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { OrderItem } from './order-item';
import { Employee } from 'src/employees/entities/employee.entity';
@Entity({ name: 'receipt' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discount: number;

  @Column()
  recieved: number;

  @Column()
  change: number;

  @Column()
  payment: string;

  @Column({ type: 'float' })
  total: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer; // Customer Id

  @ManyToOne(() => Employee, (employee) => employee.orders)
  employee: Employee;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
  orders: any;
}
