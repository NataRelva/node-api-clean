import { AccountModel } from './../account/account';
import { Cart } from '../product/cart';
export interface Order {
  id: string;
  cart: Cart;
  account: AccountModel,
  paymentMethod: string;
  shippingAddress: string;
  shippingPrice: number;
  total: number;
}