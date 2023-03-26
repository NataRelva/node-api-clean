import { FilterRequest } from './../../../../domain/models/product/product-configuration';
import { RmouraProductModel } from './../../../../domain/models/product/rmoura-product';

export interface PullProductsRmouraRepository {
  pullRmoura(props: FilterRequest): Promise<RmouraProductModel[]>
}