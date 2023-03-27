import { PurchaseModel } from './../../../models/financial/purchase-entity';
export interface SendPurchaseConfirmationEmail {
  send(data: PurchaseModel): Promise<boolean>
}