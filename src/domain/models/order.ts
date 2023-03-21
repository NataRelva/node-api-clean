import { Cart } from './cart';
import { AccountModel } from './account';
export interface Order {
  id: string;
  cart: Cart;
  account: AccountModel,
  paymentMethod: string;
  shippingAddress: string;
  shippingPrice: number;
  total: number;
}