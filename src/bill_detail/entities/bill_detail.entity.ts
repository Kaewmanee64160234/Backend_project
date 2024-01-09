import { Bill } from 'src/bills/entities/bill.entity';
import { Material } from 'src/materials/entities/material.entity';
import { Product } from 'src/products/entities/product.entity';
import { Topping } from 'src/toppings/entities/topping.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BillDetail {
  @PrimaryGeneratedColumn({ name: 'bill_detail_id' })
  id: number;

  @Column({ name: 'bill_detail_name' })
  name: string;

  @Column({ name: 'bill_detail_amount' })
  amount: number;

  @Column({ type: 'float', name: 'bill_detail_price' })
  price: number;

  @Column({ name: 'bill_detail_total' })
  total: number;

  @ManyToOne(() => Bill, (bill) => bill.billDetails)
  @JoinColumn()
  bill: Bill;

  @ManyToOne(() => Material, (material) => material.bill_detail)
  @JoinColumn()
  material: Material;

  @ManyToOne(() => Product, (product) => product.billDetails)
  product: Product;
  @ManyToMany(() => Topping, (topping) => topping.billDetails)
  @JoinTable()
  toppings: Topping[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
