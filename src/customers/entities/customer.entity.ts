import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  id: number;
  @Column({ name: 'customer_name' })
  name: string;
  @Column({ name: 'customer_tel', unique: true })
  tel: string;
  @Column({ name: 'customer_point' })
  point: number;
  @Column({ length: '255', default: 'no_image.jpg' })
  image: string;
  @CreateDateColumn({ name: 'customer_start_date' })
  createdDate: Date;
  @UpdateDateColumn({ name: 'customer_update_date' })
  updatedDate: Date;
  @DeleteDateColumn({ name: 'customer_delete_date' })
  deletedDate: Date;
}
