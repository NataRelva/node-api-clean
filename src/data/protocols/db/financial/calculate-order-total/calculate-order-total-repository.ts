import { Order } from './../../../../../domain/models/logistics/order';
export interface CalculateOrderTotalRepository { 
  calculateOrderTotal(order: Order[]): Promise<number>
}