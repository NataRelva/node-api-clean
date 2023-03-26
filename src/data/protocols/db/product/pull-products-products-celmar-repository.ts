import { CelmarProductModel } from './../../../../domain/models/product/celmar-product';
import { FilterRequest } from './../../../../domain/models/product/product-configuration';

export interface PullProductsCelmarRepository {
  pullCelmar(props: FilterRequest): Promise<CelmarProductModel[]>
}