import { PurchaseModel } from './../../../../domain/models/financial/purchase-entity';
import { CreatePurchaseRepository } from './../../../../data/protocols/db/financial/create-purchase-repository/create-purchase-repository';
import { CartModel } from './../../../../domain/models/product/cart';
import { Order } from './../../../../domain/models/logistics/order';
import { CalculateOrderTotalRepository } from './../../../../data/protocols/db/financial/calculate-order-total/calculate-order-total-repository';
import { CreateCartRepository } from './../../../../data/protocols/db/financial/create-cart-repository/create-cart-repository';
import { PrismaClient, Purchase } from '@prisma/client';
import { CheckProductAvailabilityRepository } from '../../../../data/protocols/db/product/check-product-availability-repository';
import { PurchaseHistoryGroupedByYearMonth } from '../../../../domain/useCases/financial/purchase/get-purchase-history.usecase';
import { PurchaseRepository } from '../../../../data/protocols/db/purchase/get-purchase-history-repository';

export class FinancialRepository implements CalculateOrderTotalRepository, CreateCartRepository, CreatePurchaseRepository, CheckProductAvailabilityRepository, PurchaseRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async getPurchaseById(purchaseId: string): Promise<PurchaseModel[]> {
    const purchases = await this.prisma.purchase.findMany({
      where: {accountId: purchaseId},
      include: {
        cart: {
          include: {
            cartItem: {
              include: { 
                product: true
              }
            },
            account: true,
            purchase: true,
          },
        },
        account: true,
      }
    })
    return purchases as any as PurchaseModel[]
  }
  
  async getHistory(purchases: PurchaseModel[]): Promise<PurchaseHistoryGroupedByYearMonth> {
    const history: PurchaseHistoryGroupedByYearMonth = { year: [] };
    for (const purchase of purchases) {
      const date = new Date(purchase.createdAt);
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString();
      const day = date.getDate().toString();
      let yearIndex = history.year.findIndex(yearItem => yearItem.label === year);
      if (yearIndex === -1) {
        // If year doesn't exist in history, add it with the purchase data
        const newYear = {
          label: year,
          total: purchase.total,
          month: [{
            label: month,
            total: purchase.total,
            day: [{
              label: day,
              total: purchase.total,
              purchases: [purchase]
            }]
          }]
        };
        history.year.push(newYear);
      } else {
        let monthIndex = history.year[yearIndex].month.findIndex(monthItem => monthItem.label === month);
        if (monthIndex === -1) {
          // If month doesn't exist in the year, add it with the purchase data
          const newMonth  = {
            label: month,
            total: purchase.total,
            day: [{
              label: day,
              total: purchase.total,
              purchases: [purchase]
            }]
          };
          history.year[yearIndex].month.push(newMonth);
        } else {
          let dayIndex = history.year[yearIndex].month[monthIndex].day.findIndex(dayItem => dayItem.label === day);
  
          if (dayIndex === -1) {
            // If day doesn't exist in the month, add it with the purchase data
            const newDay  = {
              label: day,
              total: purchase.total,
              purchases: [purchase]
            };
            history.year[yearIndex].month[monthIndex].day.push(newDay);
          } else {
            // If day already exists in the month, add the purchase data to it
            history.year[yearIndex].month[monthIndex].day[dayIndex].purchases.push(purchase);
            history.year[yearIndex].month[monthIndex].day[dayIndex].total += purchase.total;
          }
          // Update the total for the month and year
          history.year[yearIndex].month[monthIndex].total += purchase.total;
        }
        // Update the total for the year
        history.year[yearIndex].total += purchase.total;
      }
    }
    return history;
  }

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