import { Product } from 'src/products/entities/product.entity';
import { Topping } from 'src/toppings/entities/topping.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Catagory {
  @PrimaryGeneratedColumn({ name: 'catagory_id' })
  id: number;

  @Column({ name: 'catagory_name', unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.catagory)
  products: Product[];
  @OneToMany(() => Topping, (topping) => topping.catagory)
  catagory: Topping[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
