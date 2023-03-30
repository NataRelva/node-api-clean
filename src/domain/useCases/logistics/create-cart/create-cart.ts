import { Order } from './../../../models/logistics/order';
import { CartModel } from './../../../models/product/cart';

export interface CreateCart {
  execute(order: Order[], accountId: string): Promise<CartModel>
}