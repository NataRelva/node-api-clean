import { AccountModel } from './../../../../../domain/models/account/account';
import { Cart } from './../../../../../domain/models/product/cart';
import { Order } from './../../../../../domain/models/financial/order';
export interface CreatePrePurchaseRepository {
  create(cart: Cart, account: AccountModel): Promise<Order>
}