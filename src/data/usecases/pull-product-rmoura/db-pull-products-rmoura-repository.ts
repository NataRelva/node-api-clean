import { RmouraProductModel } from './../../../domain/models/product/rmoura-product';
import { FilterRequest } from './../../../domain/models/product/product-configuration';
import { PullProductsRmouraRepository } from './../../protocols/db/product/pull-products-products-repository';
import { PullProductsRmoura } from './../../../domain/useCases/product/pull-products-rmoura';
export class DbPullProductsRmouraRepository implements PullProductsRmoura {
  constructor(
    private readonly pullProductsRmouraRepository: PullProductsRmouraRepository,
  ) {}
  async pull(filter: FilterRequest): Promise<RmouraProductModel[]> {
    return await this.pullProductsRmouraRepository.pullRmoura(filter)
  }
}