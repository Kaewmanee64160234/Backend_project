import { Bill } from 'src/bills/entities/bill.entity';
import { Material } from 'src/materials/entities/material.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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

  @ManyToOne(() => Bill, (bill) => bill.bill_detail)
  bill: Bill;

  @ManyToOne(() => Material, (material) => material.bill_detail)
  material: Material;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
