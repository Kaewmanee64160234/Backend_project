import { IsNotEmpty } from 'class-validator';

class CreatedOrderItemDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  productId: number;
  @IsNotEmpty()
  amount: number;
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
}
