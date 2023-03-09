import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
