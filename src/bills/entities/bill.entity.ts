import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn({ name: 'bill_id' })
  id: number;

  @Column({ name: 'bill_shop_name', default: '' })
  name: string;

  @Column({ name: 'bill_date', nullable: true })
  date: Date;

  @Column({ type: 'time', name: 'bill_time' })
  time: Date;

  @Column({ type: 'float', name: 'bill_total' })
  total: number;

  @Column({ type: 'float', name: 'bill_buy' })
  buy: number;

  @Column({ name: 'bill_change' })
  change: number;

  @ManyToOne(() => Employee, (employee) => employee.bills)
  @JoinColumn()
  employee: Employee;

  @OneToMany(() => BillDetail, (bill_detail) => bill_detail.bill)
  @JoinColumn()
  bill_detail: BillDetail[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
