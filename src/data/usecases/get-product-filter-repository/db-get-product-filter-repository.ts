import { GetProductsFilter } from '../../../domain/useCases/get-products-filter';
import { FilterResponse } from './../../../domain/models/product-configuration';
import { GetProductFilterRepository } from './../../protocols/db/product/get-products-filter.repository';
export class DbGetProductFilterRepository implements GetProductsFilter {
  constructor(
    private readonly getProductFilterRepository: GetProductFilterRepository
  ) {}
  async exec(): Promise<FilterResponse> {
    return await this.getProductFilterRepository.get()
  }
}