import { Employee } from 'src/employees/entities/employee.entity';
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
export class Bill {
  @PrimaryGeneratedColumn({ name: 'bill_id' })
  id: number;

  @Column({ name: 'bill_shop_name' })
  shop_name: string;

  @Column({ type: 'datetime', name: 'bill_date' })
  date: Date;

  @Column({ type: 'time', name: 'bill_time' })
  time: Date;

  @Column({ type: 'float', name: 'bill_total' })
  total: number;

  @Column({ type: 'float', name: 'bill_buy' })
  buy: number;

  @Column({ name: 'bill_change' })
  change: boolean;

  @ManyToOne(() => Employee, (employee) => employee.bills)
  employee: Employee;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
