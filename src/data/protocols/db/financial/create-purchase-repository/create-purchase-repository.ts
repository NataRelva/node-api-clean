import { PurchaseModel } from './../../../../../domain/models/financial/purchase-entity';
export interface CreatePurchaseRepository {
  createPurchase(cartId: string): Promise<PurchaseModel>
}