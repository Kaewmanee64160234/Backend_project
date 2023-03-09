class CreatedOrderItemDto {
  name: string;
  productId: number;
  amount: number;
}
export class CreateOrderDto {
  customerId: number;
  orderItems: CreatedOrderItemDto[];
}
