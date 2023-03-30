import { CartModel } from './../../models/product/cart';
import { Order } from './../../models/logistics/order';
export interface CreateCart {
  execute(order: Order[]): Promise<CartModel>
}