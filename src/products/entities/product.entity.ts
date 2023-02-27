import { Catagory } from 'src/catagories/entities/catagory.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column({ name: 'product_name' })
  name: string;

  @Column({ name: 'product_type' })
  type: string;

  @Column({ name: 'product_size' })
  size: string;

  @Column({ type: 'float', name: 'product_price' })
  price: number;

  @ManyToOne(() => Catagory, (catagory) => catagory.products)
  catagory: Catagory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
