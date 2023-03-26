import { RmouraProductModel } from './../models/rmoura-product';
import { FilterRequest } from './../models/product-configuration';
export interface PullProductsRmoura { 
  pull(filter: FilterRequest): Promise<RmouraProductModel[]>
}