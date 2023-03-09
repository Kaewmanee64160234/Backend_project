import { OrderItem } from 'src/orders/entities/order-item';
import { Catagory } from 'src/catagories/entities/catagory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column({ length: '32', name: 'product_name' })
  name: string;

  @Column({ length: '32', name: 'product_type' })
  type: string;

  @Column({ name: 'product_size' })
  size: string;

  @Column({ type: 'float', name: 'product_price' })
  price: number;

  @Column({
    length: '128',
    default: 'no_image.jpg',
  })
  image: string;

  @Column()
  catagoryId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
  @ManyToOne(() => Catagory, (catagory) => catagory.products)
  catagory: Catagory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
