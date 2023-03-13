import { Employee } from 'src/employees/entities/employee.entity';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CheckInOut {
  @PrimaryGeneratedColumn({ name: 'cio_id' })
  id: number;

  @Column({ name: 'cio_date' })
  date: Date;

  @CreateDateColumn({ type: 'datetime', name: 'cio_time_in' })
  time_in: Date;

  @Column({ type: 'datetime', name: 'cio_time_out', nullable: true })
  time_out: Date;

  @Column({ name: 'cio_total_hour', default: 0 })
  total_hour: number;

  @ManyToOne(() => Employee, (employee) => employee.check_in_outs)
  @JoinTable()
  employee: Employee;

  @ManyToOne(() => SummarySalary, (summary_salary) => summary_salary.checkInOut)
  @JoinTable()
  summary_salary: SummarySalary;

  @CreateDateColumn({ name: 'cio_start_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'cio_update_date', type: 'datetime' })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'cio_delete_date' })
  deletedDate: Date;
}
