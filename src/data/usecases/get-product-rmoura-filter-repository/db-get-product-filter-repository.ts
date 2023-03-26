import { GetProductsFilter } from '../../../domain/useCases/product/get-products-filter';
import { FilterResponse } from './../../../domain/models/product/product-configuration';
import { GetProductFilterRepository } from './../../protocols/db/product/get-products-filter.repository';
export class DbGetProductFilterRmouraRepository implements GetProductsFilter {
  constructor(
    private readonly getProductFilterRepository: GetProductFilterRepository
  ) {}
  async exec(): Promise<FilterResponse> {
    return await this.getProductFilterRepository.getRmoura()
  }
}