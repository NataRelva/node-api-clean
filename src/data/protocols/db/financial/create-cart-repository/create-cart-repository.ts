import { ProductCheckInData } from './../../../../../domain/models/logistics/product-check-in-data';
import { Cart } from './../../../../../domain/models/product/cart';
export interface CreateCartRepository {
  create(data: ProductCheckInData[]): Promise<Cart>
}