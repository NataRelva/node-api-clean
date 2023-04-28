import { ProductResponse } from '../../../../domain/useCases/product/load-products/load-products.usecase';
import { FilterRequest } from './../../../../domain/models/product/product-configuration';

export interface ProductsRepository {
  loadByProviderID(filterProps: FilterRequest, providerId: string): Promise<ProductResponse>
}