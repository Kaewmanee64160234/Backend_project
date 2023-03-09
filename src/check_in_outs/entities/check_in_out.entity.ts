import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CheckInOut {
  @PrimaryGeneratedColumn({ name: 'cio_id' })
  id: number;

  @Column({ name: 'cio_date' })
  date: Date;

  @Column({ name: 'cio_time_in' })
  time_in: number;

  @Column({ name: 'cio_time_out' })
  time_out: number;

  @Column({ name: 'cio_total_hour' })
  total_hour: number;

  @CreateDateColumn({ name: 'cio_start_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'cio_update_date' })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'cio_delete_date' })
  deletedDate: Date;
}
