import { CelmarProductModel } from './celmar-product';
import { RmouraProductModel } from './rmoura-product';
export interface CartItem { 
  id: string
  price: number
  quantity: number
  product: {
    rmoura?: RmouraProductModel,
    celmar?: CelmarProductModel
  }
}