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
  @ManyToOne(() => SummarySalary, (summary_salary) => summary_salary.checkInOut)
  summary_salary: SummarySalary;
  @Column({ name: 'cio_time_in' })
  time_in: number;

  @Column({ name: 'cio_time_out' })
  time_out: number;

  @Column({ name: 'cio_total_hour' })
  total_hour: number;

  @CreateDateColumn({ name: 'cio_start_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'cio_update_date' })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'cio_delete_date' })
  deletedDate: Date;
}
