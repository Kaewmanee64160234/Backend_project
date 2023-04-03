import { CheckInOut } from 'src/check_in_outs/entities/check_in_out.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class SummarySalary {
  @PrimaryGeneratedColumn({ name: 'ss_id' })
  id: number;
  @CreateDateColumn({ name: 'ss_date', nullable: true })
  ss_date: Date;
  @Column({ name: 'ss_work_hour', type: 'float', default: 1 })
  hour: number;
  @Column({ name: 'ss_salary', type: 'float', default: 90000 })
  salary: number;
  @OneToMany(() => CheckInOut, (check_in_out) => check_in_out.summary_salary)
  @JoinTable()
  checkInOut: CheckInOut[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
