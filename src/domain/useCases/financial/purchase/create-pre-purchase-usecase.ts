import { ProductCheckInData } from './../../../models/logistics/product-check-in-data';
import { Order } from './../../../models/financial/order';
export interface CreatePrePurchase { 
  create: (data: ProductCheckInData[]) => Promise<Order>
}