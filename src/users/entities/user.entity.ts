import { Employee } from 'src/employees/entities/employee.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @OneToOne(() => Employee, (employee) => employee.user)
  @JoinColumn()
  employee: Employee;
  @JoinColumn()
  @Column({ name: 'user_name' })
  username: string;

  @Column({ name: 'user_login', unique: true })
  login: string;

  @Column({ name: 'user_password' })
  password: string;

  @Column({ name: 'user_role' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
