import { PurchaseModel } from './../../../models/financial/purchase-entity';
import { ProductCheckOutData } from '../../../models/logistics/product-check-out-data';
export interface ProductCheckOut {
  checkout: (data: PurchaseModel) => Promise<ProductCheckOutData[]>
}