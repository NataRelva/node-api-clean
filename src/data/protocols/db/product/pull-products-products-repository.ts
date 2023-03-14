import { FilterRequest } from './../../../../domain/models/product-configuration';
import { RmouraProductModel } from './../../../../domain/models/rmoura-product';

export interface PullProductsRmouraRepository {
  pullRmoura(props: FilterRequest): Promise<RmouraProductModel[]>
}