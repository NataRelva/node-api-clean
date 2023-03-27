import { PurchaseModel } from './../../../../../domain/models/financial/purchase-entity';
import { Order } from './../../../../../domain/models/financial/order';
export interface CreatePurchaseRepository {
  create(data: Order): Promise<PurchaseModel>
}