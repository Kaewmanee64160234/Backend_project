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
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  queue: number;

  @Column()
  time: number;

  @Column()
  discount: number;

  @Column()
  recieved: number;

  @Column()
  change: number;

  @Column()
  payment: number;

  @Column({ type: 'float' })
  total: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer; // Customer Id

  @ManyToOne(() => Store, (store) => store.orders)
  store: Store; // Customer Id

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
