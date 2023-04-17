import { DataPurchaseEmail } from './../../domain/models/financial/purchase-entity';
export interface SendPurchaseConfirmationEmail {
  sendFromPurchaseConfirmation: (data: DataPurchaseEmail) => Promise<boolean>
}