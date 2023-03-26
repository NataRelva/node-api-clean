import { AccountModel } from './../account/account';
import { Cart } from './../product/cart';
export interface PurchaseModel { 
  id: string;
  cart: Cart;
  account: AccountModel,
  paymentMethod: string;
  shippingAddress: string;
  shippingPrice: number;
  total: number;
  status: 'pending' | 'approved' | 'canceled' | 'refunded' | 'shipped' | 'delivered' | 'returned' | 'disputed';
  createDate: Date;
  updateDate: Date;
}