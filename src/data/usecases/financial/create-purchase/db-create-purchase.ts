
import { CreatePurchaseRepository } from './../../../protocols/db/financial/create-purchase-repository/create-purchase-repository';
import { PurchaseModel } from './../../../../domain/models/financial/purchase-entity';
import { CreatePurchase } from './../../../../domain/useCases/financial/purchase/create-purchase-usecase';
import { SendPurchaseConfirmationEmail } from '../../../../services/protocols';
export class DbCreatePurchase implements CreatePurchase {
  constructor(
    private readonly createPurchaseRepository: CreatePurchaseRepository,
    private readonly sendPurchaseConfirmationEmail: SendPurchaseConfirmationEmail
  ) {}
  async execute(cartId: string): Promise<PurchaseModel> {
    const purchase = await this.createPurchaseRepository.createPurchase(cartId)
    await this.sendPurchaseConfirmationEmail.sendFromPurchaseConfirmation(purchase)
    return purchase
  }
}