import { GetPurchaseHistory } from '../../../domain/useCases/financial/purchase/get-purchase-history.usecase';
import { PurchaseHistoryGroupedByYearMonth } from '../../../domain/useCases/financial/purchase/get-purchase-history.usecase';
import { PurchaseRepository } from '../../protocols/db/purchase/get-purchase-history-repository';
export class DbPurchaseHistory implements GetPurchaseHistory {
  constructor(
    private readonly purchase: PurchaseRepository
  ){}
  async get(accountId: string): Promise<PurchaseHistoryGroupedByYearMonth> {
    const purchases = await this.purchase.getPurchaseById(accountId);
    const history = await this.purchase.getHistory(purchases);
    return history;
  }
}