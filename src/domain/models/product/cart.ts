import { AccountModel } from './../account/account';
import { ProductModel } from './product';

export interface CartItem {
  id: string, 
  product: ProductModel,
  quantity: number
}

export interface CartModel {
  id: string,
  account: AccountModel
  cartItem: CartItem[],
  total: number
}
