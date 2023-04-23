import { PurchaseModel } from "../../../../domain/models/financial/purchase-entity";
import { PurchaseHistoryGroupedByYearMonth } from "../../../../domain/useCases/financial/purchase/get-purchase-history.usecase";

export interface PurchaseRepository {
  getPurchaseById(purchaseId: string): Promise<PurchaseModel[]>
  getHistory(purchases: PurchaseModel[]): Promise<PurchaseHistoryGroupedByYearMonth>
}