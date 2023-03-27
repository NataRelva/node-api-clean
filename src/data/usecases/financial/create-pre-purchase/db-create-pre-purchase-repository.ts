import { CreateCartRepository } from './../../../protocols/db/financial/create-cart-repository/create-cart-repository';
import { CreatePrePurchaseRepository } from './../../../protocols/db/financial/create-pre-purchase-repository/create-pre-purchase-repository';
import { LoadAccountByToken } from './../../../../domain/useCases/account/load-account-by-token';
import { AccountModel } from './../../../../domain/models/account/account';
import { Cart } from './../../../../domain/models/product/cart';
import { Order } from './../../../../domain/models/financial/order';
import { ProductCheckInData } from './../../../../domain/models/logistics/product-check-in-data';
import { CreatePrePurchase } from './../../../../domain/useCases/financial/purchase/create-pre-purchase-usecase';
export class DbCreatePrePurchase implements CreatePrePurchase {
  constructor(
    private readonly createPrePurchaseRepository: CreatePrePurchaseRepository,
    private readonly loadAccount: LoadAccountByToken,
    private readonly createCart: CreateCartRepository,
  ) {}
  async create(data: ProductCheckInData[], accountId: string): Promise<Order> {
    if (!data || Object.values(data).length == 0) throw new Error('Missing param: data');
    const account: AccountModel = await this.loadAccount.load(accountId);
    const cart: Cart = await this.createCart.create(data);
    const order: Order = await this.createPrePurchaseRepository.create(cart, account);
    return order;
  }
}