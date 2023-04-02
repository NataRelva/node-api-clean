import { PurchaseModel } from './../../../../domain/models/financial/purchase-entity';
import { CreatePurchaseRepository } from './../../../../data/protocols/db/financial/create-purchase-repository/create-purchase-repository';
import { CartModel } from './../../../../domain/models/product/cart';
import { Order } from './../../../../domain/models/logistics/order';
import { CalculateOrderTotalRepository } from './../../../../data/protocols/db/financial/calculate-order-total/calculate-order-total-repository';
import { CreateCartRepository } from './../../../../data/protocols/db/financial/create-cart-repository/create-cart-repository';
import { PrismaClient } from '@prisma/client';
import { CheckProductAvailabilityRepository } from '../../../../data/protocols/db/product/check-product-availability-repository';

export class FinancialRepository implements CalculateOrderTotalRepository, CreateCartRepository, CreatePurchaseRepository, CheckProductAvailabilityRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async checkAvailability(data: Order[]): Promise<boolean> {
    for(const { productId, quantity } of data) {
      if (productId === undefined || quantity === undefined) throw new Error('No product or quantity was provided')
      const product = await this.prisma.product.findUnique({where: {id: productId}})
      if (!product) return false
    }
    return true
  }

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
        },
        include: {
          product: true,
          cart: true
        }
      })
    }
    const returnCart = await this.prisma.cart.findUnique(
      { 
        where: {
          id: cart.id
        }, 
        include: {
          cartItem: {
            include: {
              product: {
                include: { 
                  category: true,
                  package: true,
                  unit: true,
                  mainCategory: true,
                  subCategory: true,
                }
              }
            }
          },
          account: true 
        }
      }
    )
    return returnCart as any as CartModel
  }

  async createPurchase(cartId: string): Promise<PurchaseModel> { 
    const cart = await this.prisma.cart.findUnique({
      where: {id: cartId},
      include: { 
        cartItem: { 
          include: { 
            product: true,
          }
        },
        account: true
      }
    })
    const purchase = await this.prisma.purchase.create({ 
      data: {
        cart: {
          connect: { 
            id: cart.id
          }
        },
        account: { 
          connect: { 
            id: cart.accountId
          }
        },
        shippingAddress: '',
        shippingPrice: 0,
        paymentMethod: '',
        total: cart.total,
        status: 'pending',
      },
      include: { 
        cart: { 
          include: { 
            cartItem: {
              include: { 
                product: {
                  include: {
                    category: true,
                    package: true,
                    unit: true,
                    mainCategory: true,
                    subCategory: true,
                  }
                }
              }
            },
            account: true
          }
        },
        account: true
      }
    })  as any as PurchaseModel
    return purchase
  }
}