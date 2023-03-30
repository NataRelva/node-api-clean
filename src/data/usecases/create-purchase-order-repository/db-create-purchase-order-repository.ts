import { CreateOrder } from './../../../domain/useCases/financial/order/create-order';
import { ShoppingCart } from './../../../presentation/protocols/shopping-cart';
import { CreatePurchaseOrderRepository } from './../../protocols/db/purchase/create-purchase-order-repository';
export class DbCreatePurchaseOrderRepository implements CreateOrder {
  constructor (
    private readonly createPurchaseOrderRepository: CreatePurchaseOrderRepository,
  ) {}
  async create(data: ShoppingCart): Promise<any> { }
}