import { FilterRequest } from './../models/product-configuration';
import { RmouraProduct } from './register-rmoura-product';
export interface PullProductsRmoura { 
  pull(filter: FilterRequest): Promise<RmouraProduct[]>
}