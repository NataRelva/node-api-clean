import { CelmarProductModel } from './../../../../domain/models/celmar-product';
import { FilterRequest } from './../../../../domain/models/product-configuration';

export interface PullProductsCelmarRepository {
  pullCelmar(props: FilterRequest): Promise<CelmarProductModel[]>
}