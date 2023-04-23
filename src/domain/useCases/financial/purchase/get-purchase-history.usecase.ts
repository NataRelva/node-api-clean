import { PurchaseModel } from "../../../models/financial/purchase-entity";
import { CartModel } from "../../../models/product";

export interface PurchaseHistoryGroupedByYearMonth {
  year: {
    label: string;
    total: number;
    month: {
      label: string;
      total: number;
      day: {
        label: string;
        total: number;
        purchases: PurchaseModel[];
      }[]
    }[]
  }[]
}

export interface GetPurchaseHistory {
  get(accountId: string): Promise<PurchaseHistoryGroupedByYearMonth>
}