import { ShoppingCart } from './../models/shopping-cart';
export interface CreateOrder {
  create: (data: ShoppingCart) => Promise<void>
}