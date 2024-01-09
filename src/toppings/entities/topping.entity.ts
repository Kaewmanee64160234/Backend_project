import { IsNotEmpty, IsPositive, Length } from 'class-validator';
import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';
import { Catagory } from 'src/catagories/entities/catagory.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Topping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'topping_name', length: 32 })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => Catagory, (catagory) => catagory.id)
  category: Catagory;

  @ManyToMany(() => BillDetail, (billDetail) => billDetail.toppings)
  billDetails: BillDetail[];
}
