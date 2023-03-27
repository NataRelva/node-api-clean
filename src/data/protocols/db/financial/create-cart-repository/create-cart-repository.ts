import { ProductCheckInData } from './../../../../../domain/models/logistics/product-check-in-data';
import { Cart } from './../../../../../domain/models/product/cart';
export interface CreateCartRepository {
  createCart(data: ProductCheckInData[]): Promise<Cart>
}