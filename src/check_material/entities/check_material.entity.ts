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
export class CheckMaterial {
  @PrimaryGeneratedColumn({ name: 'check_mat_id' })
  id:number;

  @Column({type: 'datetime', name: 'check_mat_date'})
  date:Date;

  @Column({type: 'time', name: 'check_mat_time'})
  time:Date;

  @ManyToOne(() => Employee, (employee) => employee.checkmaterials)
  employees: Employee[];

  @CreateDateColumn({ name: 'check_mat_start_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'check_mat_update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'check_mat_delete_date' })
  deletedAt: Date;
}
