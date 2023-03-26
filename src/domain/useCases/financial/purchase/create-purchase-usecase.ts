import { Order } from './../../../models/financial/order';
import { PurchaseModel } from './../../../models/financial/purchase-entity';
export interface CreatePurchase {
  create: (data: Order) => Promise<PurchaseModel>
}