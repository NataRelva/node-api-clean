import { AccountModel } from './../account/account';
import { ProductModel } from './product';

export interface CartModel {
  id: string,
  account: AccountModel
  products: ProductModel[],
  total: number
}
