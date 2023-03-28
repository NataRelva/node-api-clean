import { ShoppingCart } from './../../../presentation/protocols/shopping-cart';
import { CreateOrder } from './../../../domain/useCases/financial/order/create-order';
import { CreatePurchaseOrderRepository } from './../../protocols/db/purchase/create-purchase-order-repository';
export class DbCreatePurchaseOrderRepository implements CreateOrder {
  constructor (
    private readonly createPurchaseOrderRepository: CreatePurchaseOrderRepository,
  ) {}

  async create (data: ShoppingCart): Promise<void> {
    await this.createPurchaseOrderRepository.create(data)
  }
}