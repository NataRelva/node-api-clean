import { ProductModel } from './../../../../domain/models/product/product';

export interface RequestedProductDetails {
  product: ProductModel,
  quantity: number
}

export interface DTOLoadProductByIdentifier {
  id: string,
  quantity: number,
}

export interface LoadProductsByIdsRepository {
  loadProductsByIds: (ids: DTOLoadProductByIdentifier[]) => Promise<RequestedProductDetails[]>
}