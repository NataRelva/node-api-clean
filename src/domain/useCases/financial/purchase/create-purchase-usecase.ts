import { PurchaseModel } from './../../../models/financial/purchase-entity';
export interface CreatePurchase {
  execute(cartId: string): Promise<PurchaseModel>
}