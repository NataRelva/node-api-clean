import { Order } from './../../../../../domain/models/logistics/order';
import { CartModel } from './../../../../../domain/models/product/cart';
export interface CreateCartRepository {
  createCart(data: Order[], total: number, accountId: string): Promise<CartModel>
}