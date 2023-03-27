import { ProductCheckInData } from './../../../../domain/models/logistics/product-check-in-data';
import { CreateCartRepository } from './../../../../data/protocols/db/financial/create-cart-repository/create-cart-repository';
import { Order } from './../../../../domain/models/financial/order';
import { AccountModel } from './../../../../domain/models/account/account';
import { Cart } from './../../../../domain/models/product/cart';
import { CreatePrePurchaseRepository } from './../../../../data/protocols/db/financial/create-pre-purchase-repository/create-pre-purchase-repository';
import { PrismaClient } from '@prisma/client';
export class FinancialRepository implements CreatePrePurchaseRepository, CreateCartRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async createCart(data: ProductCheckInData[]): Promise<Cart> { 
    return new Promise<any>((resolve, reject) => { 
      resolve('')
    })
  }

  async createPrePurchase(cart: Cart, account: AccountModel): Promise<Order> {
    return new Promise<any>((resolve, reject) => { 
      resolve('')
    })
  }
}