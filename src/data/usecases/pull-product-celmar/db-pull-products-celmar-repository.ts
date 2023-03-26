import { PullProductsCelmarRepository } from './../../protocols/db/product/pull-products-products-celmar-repository';
import { CelmarProductModel } from './../../../domain/models/product/celmar-product';
import { PullProductsCelmar } from './../../../domain/useCases/product/pull-products-celmar';
import { FilterRequest } from './../../../domain/models/product/product-configuration';

export class DbPullProductsCelmarRepository implements PullProductsCelmar {
  constructor(
    private readonly pullProductsCelmarRepository: PullProductsCelmarRepository,
  ) {}
  async pull(filter: FilterRequest): Promise<CelmarProductModel[]> {
    return await this.pullProductsCelmarRepository.pullCelmar(filter)
  }
}