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
import { Store } from 'src/stores/entities/store.entity';
import { Employee } from 'src/employees/entities/employee.entity';
<<<<<<< HEAD
=======

>>>>>>> 43a53bccbc4600dfa2ab0fc7fd003d32b9bf6005
@Entity({ name: 'order_' })
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

  @ManyToOne(() => Store, (store) => store.orders)
  store: Store;

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
