import { ProductCheckInData } from './../../../models/logistics/product-check-in-data';
import { ShoppingCart } from '../../../../presentation/protocols/shopping-cart';
export interface ProductCheckIn {
  checkIn: (data: ShoppingCart) => Promise<ProductCheckInData[]>
}