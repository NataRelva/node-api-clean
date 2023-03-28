import { FilterRequest } from './../../../../domain/models/product/product-configuration';
import { ProductModel } from './../../../../domain/models/product';

export interface PullProductsRmouraRepository {
  pullRmoura(props: FilterRequest): Promise<ProductModel[]>
}