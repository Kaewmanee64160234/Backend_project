import { CheckMaterialDetail } from 'src/check_material_detail/entities/check_material_detail.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn({ name: 'mat_id' })
  id: number;

  @Column({ name: 'mat_name' })
  name: string;

  @Column({ name: 'mat_min_quantity' })
  min_quantity: number;

  @Column({ name: 'mat_quantity' })
  quantity: number;

  @Column({ name: 'mat_unit' })
  unit: string;

  @Column({ type: 'float', name: 'mat_price_per_unit' })
  price_per_unit: number;

  @CreateDateColumn({ name: 'mat_start_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'mat_update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'mat_delete_date' })
  deletedAt: Date;

  @OneToMany(() => CheckMaterialDetail, (checkmaterialdetail) => checkmaterialdetail.materials)
  checkmaterialdetails: CheckMaterialDetail[];
}
