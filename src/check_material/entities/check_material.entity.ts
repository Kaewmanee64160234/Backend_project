import { CheckMaterialDetail } from 'src/check_material_detail/entities/check_material_detail.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class CheckMaterial {
  @PrimaryGeneratedColumn({ name: 'check_mat_id' })
  id: number;

  @Column({ name: 'check_mat_date' })
  date: Date;

  // @Column({ name: 'check_mat_time' })
  // time: Date;

  @ManyToOne(() => Employee, (employee) => employee.checkmaterials)
  @JoinTable()
  employee: Employee;

  @OneToMany(
    () => CheckMaterialDetail,
    (checkmaterialdetail) => checkmaterialdetail.checkmaterial,
  )
  @JoinTable()
  checkmaterialdetails: CheckMaterialDetail[];

  @CreateDateColumn({ name: 'check_mat_start_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'check_mat_update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'check_mat_delete_date' })
  deletedAt: Date;
}
