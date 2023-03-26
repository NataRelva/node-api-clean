import { FilterResponse } from './../models/product-configuration';
export interface GetProductsFilter { 
  exec(): Promise<FilterResponse>
}