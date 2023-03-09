import { CheckMaterialDetail } from 'src/check_material_detail/entities/check_material_detail.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => CheckMaterialDetail, (checkmaterialdetail) => checkmaterialdetail.checkmaterials)
  checkmaterialdetails: CheckMaterialDetail[];

  @CreateDateColumn({ name: 'check_mat_start_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'check_mat_update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'check_mat_delete_date' })
  deletedAt: Date;
}
