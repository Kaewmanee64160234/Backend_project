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
export class CheckMaterialDetail {
  @PrimaryGeneratedColumn({ name: 'cmd_id' })
  id:number;

  @Column({ name: 'cmd_name' })
  name:string;

  @Column({ name: 'cmd_qty_last' })
  qty_last: number;

  @Column({ name: 'cmd_qty_remain' })
  qty_remain:number;

  @Column({ name: 'cmd_qty_expire' })
  qty_expire: number;

}
