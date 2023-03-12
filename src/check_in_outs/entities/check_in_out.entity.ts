import { Employee } from 'src/employees/entities/employee.entity';
import { SummarySalary } from 'src/summary_salary/entities/summary_salary.entity';
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
export class CheckInOut {
  @PrimaryGeneratedColumn({ name: 'cio_id' })
  id: number;

  @Column({ name: 'cio_date' })
  date: Date;

  @Column({ type: 'datetime', name: 'cio_time_in' })
  time_in: Date;

  @Column({ type: 'datetime', name: 'cio_time_out' })
  time_out: Date;

  @Column({ type: 'datetime', name: 'cio_total_hour' })
  total_hour: Date;

  @ManyToOne(() => Employee, (employee) => employee.check_in_outs)
  employee: Employee;

  @ManyToOne(() => SummarySalary, (summary_salary) => summary_salary.checkInOut)
  summary_salary: SummarySalary;

  @CreateDateColumn({ name: 'cio_start_date', type: 'datetime' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'cio_update_date', type: 'datetime' })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'cio_delete_date' })
  deletedDate: Date;
}
