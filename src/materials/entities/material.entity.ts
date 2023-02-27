import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  minquantity: number;

  @Column({ name: 'mat_quantity' })
  quantity: number;

  @Column({ name: 'mat_unit' })
  unit: number;

  @Column({ type: 'float', name: 'mat_price_per_unit' })
  price_per_unit: number;

  @CreateDateColumn({ name: 'mat_start_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'mat_update_date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'mat_delete_date' })
  deletedAt: Date;
}
