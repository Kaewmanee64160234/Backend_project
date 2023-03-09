import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 68 })
  name: string;

  @Column({ length: 128 })
  address: string;

  @Column({ length: 13 })
  tel: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Order, (order) => order.orders)
  order: Order[];
  orders: any;
}
