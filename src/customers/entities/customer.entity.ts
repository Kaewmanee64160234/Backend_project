import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Customer {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  id: number;
  @Column({ name: 'customer_name' })
  name: string;
  @Column({ name: 'customer_tel' })
  tel: string;
  @Column({ name: 'customer_point' })
  point: number;
  @Column({ name: 'customer_start_date' })
  createedDate: Date;
}
