import { CartModel } from './../../../../../domain/models/product/cart';
import { Order } from './../../../../../domain/models/logistics/order';
export interface CreateCartRepository {
  createCart(order: Order[]): Promise<CartModel>
}