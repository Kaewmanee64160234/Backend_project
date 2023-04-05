import { Bill } from 'src/bills/entities/bill.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CheckInOut } from 'src/check_in_outs/entities/check_in_out.entity';
import { CheckMaterial } from 'src/check_material/entities/check_material.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ name: 'employee_id' })
  id: number;

  @Column({ name: 'employee_name' })
  name: string;

  @Column({ name: 'employee_address' })
  address: string;

  @Column({ name: 'employee_tel' })
  tel: string;

  @Column({ name: 'employee_email', unique: true, length: '64' })
  email: string;

  @Column({ name: 'employee_position' })
  position: string;

  @Column({ name: 'employee_hourly_wage' })
  @Column({ name: 'employee_hourly_wage', default: 0 })
  hourly: number;

  @Column({ length: '128', default: 'no_image.jpg' })
  image: string;
  @Column({ name: 'employee_salary', default: 9000 })
  salary: number;
  @Column({ name: 'employee_full_time', default: true })
  fullTime: boolean;
  @OneToOne(() => User, (user) => user.employee)
  user: User;
  @JoinColumn()
  @OneToMany(() => CheckInOut, (check_in_out) => check_in_out.employee)
  @JoinTable()
  check_in_outs: CheckInOut[];

  @OneToMany(() => CheckMaterial, (checkmaterial) => checkmaterial.employee)
  @JoinTable()
  checkmaterials: CheckMaterial[];

  @OneToMany(() => Bill, (bill) => bill.employee)
  bills: Bill[];

  @CreateDateColumn({ name: 'employee_start_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'employee_update_date' })
  updatedDate: Date;

  @DeleteDateColumn({ name: 'employee_delete_date' })
  deletedDate: Date;
  orders: any;

  @OneToMany(() => Order, (order) => order.orders)
  @JoinTable()
  @JoinColumn()
  order: Order[];
}
