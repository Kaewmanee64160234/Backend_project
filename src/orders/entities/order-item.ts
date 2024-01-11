import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from './order.entity';
import { Topping } from 'src/toppings/entities/topping.entity';
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: '32',
  })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  amount: number;

  @Column({ type: 'float' })
  total: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product; // Product Id
  @ManyToMany(() => Topping, (topping) => topping.orderItems)
  @JoinTable()
  toppings: Topping[];
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
