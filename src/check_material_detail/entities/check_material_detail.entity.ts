import { CheckMaterial } from 'src/check_material/entities/check_material.entity';
import { Material } from 'src/materials/entities/material.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class CheckMaterialDetail {
  @PrimaryGeneratedColumn({ name: 'cmd_id' })
  id: number;

  @Column({ name: 'cmd_name' })
  name: string;

  @Column({ name: 'cmd_qty_last' })
  qty_last: number;

  @Column({ name: 'cmd_qty_remain' })
  qty_remain: number;

  @Column({ name: 'cmd_qty_expire' })
  qty_expire: number;

  @CreateDateColumn({ name: 'cmd_start_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'cmd_update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'cmd_delete_date' })
  deletedAt: Date;

  @ManyToOne(() => Material, (material) => material.checkmaterialdetails)
  @JoinColumn()
  material: Material;

  @ManyToOne(
    () => CheckMaterial,
    (checkmaterial) => checkmaterial.checkmaterialdetails,
  )
  @JoinColumn()
  checkmaterials: CheckMaterial;
  static checkmaterial: string;
}
