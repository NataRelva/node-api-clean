import { CreatePurchaseRepository } from './../../../protocols/db/financial/create-purchase-repository/create-purchase-repository';
import { PurchaseModel } from './../../../../domain/models/financial/purchase-entity';
import { CreatePurchase } from './../../../../domain/useCases/financial/purchase/create-purchase-usecase';
export class DbCreatePurchase implements CreatePurchase {
  constructor(
    private readonly createPurchaseRepository: CreatePurchaseRepository,
  ) {}
  async execute(cartId: string): Promise<PurchaseModel> {
    return await this.createPurchaseRepository.createPurchase(cartId)
  }
}