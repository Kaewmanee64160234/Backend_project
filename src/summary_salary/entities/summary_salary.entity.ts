import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class SummarySalary {
  @PrimaryGeneratedColumn({ name: 'ss_id' })
  id: number;
  @Column({ name: 'ss_date' })
  ss_date: number;
  @Column({ name: 'ss_work_hour', type: 'float' })
  hour: number;
  @Column({ name: 'ss_salary', type: 'float' })
  salary: number;
}
