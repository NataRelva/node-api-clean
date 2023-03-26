import { ShoppingCart } from './../../../../presentation/protocols/shopping-cart';
import { Order } from './../../../models/financial/order';
export interface CreateOrder {
  create: (data: ShoppingCart) => Promise<Order>
}