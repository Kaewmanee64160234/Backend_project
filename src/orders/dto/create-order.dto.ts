import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { Order } from '../entities/order.entity';

class CreatedOrderItemDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  total: number;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  order?: Order;
  @IsNotEmpty()
  product?: Product; // Product Id
  @IsNotEmpty()
  createdDate?: Date;
  @IsNotEmpty()
  updatedDate?: Date;
  @IsNotEmpty()
  deletedDate?: Date;
  image?: string;
}
export class CreateOrderDto {
  @IsNotEmpty()
  customerId: number;
  @IsNotEmpty()
  discount: number;
  @IsNotEmpty()
  total: number;
  @IsNotEmpty()
  recieved: number;
  @IsNotEmpty()
  change: number;
  @IsNotEmpty()
  payment: string;
  @IsNotEmpty()
  orderItems: CreatedOrderItemDto[];
  storeId?: string;
  createdDate: Date;
}
