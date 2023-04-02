import { CalculateOrderTotalRepository } from './../../../protocols/db/financial/calculate-order-total/calculate-order-total-repository';
import { CreateCartRepository } from './../../../protocols/db/financial/create-cart-repository/create-cart-repository';
import { CartModel } from './../../../../domain/models/product/cart';
import { Order } from './../../../../domain/models/logistics/order';
import { CreateCart } from './../../../../domain/useCases/logistics/create-cart/create-cart';
export class DbCreateCartRepository implements CreateCart {
  constructor (
    private readonly createCartRepository: CreateCartRepository,
    private readonly calculateOrderTotal: CalculateOrderTotalRepository,
  ) {}
  async execute(order: Order[], accountId: string): Promise<CartModel> {
    if (!order || order.length === 0) {
      throw new Error('No order was provided')
    } else if (!Array.isArray(order)) {
      throw new Error('The order must be an array')
    } 
    if (!accountId) { 
      throw new Error('No account was provided')
    }
    const total = await this.calculateOrderTotal.calculateOrderTotal(order)
    return await this.createCartRepository.createCart(order, total, accountId)
  }
}