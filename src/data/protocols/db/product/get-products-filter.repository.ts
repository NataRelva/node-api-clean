import { FilterResponse } from './../../../../domain/models/product-configuration';
export interface GetProductFilterRepository {
  getRmoura(): Promise<FilterResponse>
  getCelmar(): Promise<FilterResponse>
}