import { FilterResponse } from './../../models/product/product-configuration';
export interface GetProductsFilter { 
  exec(): Promise<FilterResponse>
}