import { ShoppingCart } from './../../../../domain/models/shopping-cart';
export interface CreatePurchaseOrderRepository { 
  create: (data: ShoppingCart) => Promise<void>
}