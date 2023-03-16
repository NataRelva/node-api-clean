import { FilterRequest } from './../models/product-configuration';
import { CelmarProductModel } from './../models/celmar-product';
export interface PullProductsCelmar {
  pull(filter: FilterRequest): Promise<CelmarProductModel[]>
}