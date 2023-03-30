import { CartModel } from './../../../../domain/models/product/cart';
import { ProductModel } from './../../../../domain/models/product/product';
import { Order } from './../../../../domain/models/logistics/order';
import { CalculateOrderTotalRepository } from './../../../../data/protocols/db/financial/calculate-order-total/calculate-order-total-repository';
import { CreateCartRepository } from './../../../../data/protocols/db/financial/create-cart-repository/create-cart-repository';
import { AccountModel } from './../../../../domain/models/account/account';
import { PrismaClient } from '@prisma/client';

export class FinancialRepository implements CalculateOrderTotalRepository, CreateCartRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async calculateOrderTotal(order: Order[]): Promise<number> {
    let total = 0;
    for(const {productId, quantity} of order) {
      const product = await this.prisma.product.findUnique({where: {id: productId}})
      total += product.price * quantity
    }
    return total
  }

  async createCart(data: Order[], total: number, accountId: string): Promise<CartModel>{
    const account = await this.prisma.account.findUnique({where: {id: accountId}})
    const cart = await this.prisma.cart.create({
      data: {
        total,
        account: {
          connect: {
            id: account.id
          }
        }
      }
    })
    for(const { productId, quantity } of data) {
      const product = await this.prisma.product.findUnique({where: {id: productId}})
      await this.prisma.cartItem.create({
        data: {
          quantity,
          product: {
            connect: {
              id: product.id
            }
          },
          cart: {
            connect: {
              id: cart.id
            }
          }
        }
      })
    }
    return cart as any as CartModel
  }

}