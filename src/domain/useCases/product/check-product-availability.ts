import { Order } from './../../models/logistics/order';
export interface CheckProductAvailability {
  execute(order: Order[]): Promise<boolean>
}