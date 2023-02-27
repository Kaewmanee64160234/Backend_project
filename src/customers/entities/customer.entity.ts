import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Customer {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  id: number;
  @Column({ name: 'customer_name' })
  name: string;
  @Column({ name: 'customer_tel' })
  tel: string;
  @Column({ name: 'customer_point' })
  point: number;
  @CreateDateColumn({ name: 'customer_start_date' })
  createdDate: Date;
  @UpdateDateColumn({ name: 'customer_update_date' })
  updatedDate: Date;
  @DeleteDateColumn({ name: 'customer_delete_date' })
  deletedDate: Date;
}
