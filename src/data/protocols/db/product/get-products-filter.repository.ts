import { FilterResponse } from './../../../../domain/models/product/product-configuration';
export interface GetProductFilterRepository {
  getRmoura(): Promise<FilterResponse>
  getCelmar(): Promise<FilterResponse>
}