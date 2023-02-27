import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  id: number;

  @Column({ name: 'product_name' })
  name: string;

  @Column({ name: 'product_type' })
  type: string;


  @Column({ name: 'product_size' })
  size: string;

  @Column({ type: 'float', name: 'product_price' })

  price: number;
}
