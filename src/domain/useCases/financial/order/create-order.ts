import { Order } from '../../../models/logistics/order';
import { ShoppingCart } from './../../../../presentation/protocols/shopping-cart';
export interface CreateOrder {
  create(data: ShoppingCart): Promise<Order>
}