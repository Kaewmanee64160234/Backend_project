import { BillDetail } from 'src/bill_detail/entities/bill_detail.entity';
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
  @Column({
    length: '128',
    default: 'no_image.jpg',
  })
  image: string;

  @OneToMany(() => BillDetail, (bill_detail) => bill_detail.material)
  bill_detail: BillDetail[];

  @CreateDateColumn({ name: 'mat_start_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'mat_update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'mat_delete_date' })
  deletedAt: Date;

  @OneToMany(
    () => CheckMaterialDetail,
    (checkmaterialdetail) => checkmaterialdetail.material,
  )
  checkmaterialdetails: CheckMaterialDetail[];
}
