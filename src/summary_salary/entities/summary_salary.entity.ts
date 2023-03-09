import { CheckInOut } from 'src/check_in_outs/entities/check_in_out.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class SummarySalary {
  @PrimaryGeneratedColumn({ name: 'ss_id' })
  id: number;
  @Column({ name: 'ss_date' })
  ss_date: number;
  @Column({ name: 'ss_work_hour', type: 'float' })
  hour: number;
  @Column({ name: 'ss_salary', type: 'float' })
  salary: number;
  @OneToMany(() => CheckInOut, (check_in_out) => check_in_out.summary_salary)
  checkInOut: CheckInOut[];
}
