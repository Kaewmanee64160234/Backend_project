import { Bill } from 'src/bills/entities/bill.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ name: 'employee_id' })
  id: number;

  @Column({ name: 'employee_name' })
  name: string;

  @Column({ name: 'employee_address' })
  address: string;

  @Column({ name: 'employee_tel' })
  tel: string;

  @Column({ name: 'employee_email', unique: true, length: '64' })
  email: string;

  @Column({ name: 'employee_position' })
  position: string;

  @Column({ name: 'employee_hourly_wage' })
  hourly: number;

  @Column({ length: '128', default: 'no_image.jpg' })
  image: string;

  @OneToMany(() => Bill, (bill) => bill.employee)
  bills: Bill[];

  @CreateDateColumn({ name: 'employee_start_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'employee_update_date' })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'employee_delete_date' })
  deletedDate: Date;
}
