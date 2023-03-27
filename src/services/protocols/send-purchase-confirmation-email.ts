import { PurchaseModel } from './../../domain/models/financial/purchase-entity';
export interface SendPurchaseConfirmationEmail {
  sendFromPurchaseConfirmation: (data: PurchaseModel) => Promise<boolean>
}