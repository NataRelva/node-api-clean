import { ShoppingCart } from './../../../../presentation/protocols/shopping-cart';

export interface CreatePurchaseOrderRepository { 
  create(data: ShoppingCart): Promise<void>
}