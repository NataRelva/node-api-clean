import { FilterResponse } from './../../../../domain/models/product-configuration';
export interface GetProductFilterRepository {
  get(): Promise<FilterResponse>
}