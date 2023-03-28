import { ProductModel } from './../../../../domain/models/product/product';

export interface RequestedProductDetails {
  product: ProductModel,
  quantity: number,
  discount: number
}

export interface DTOLoadProductByIdentifier {
  id: string,
  quantity: number,
  discount: number
}

export interface LoadProductsByIdsRepository {
  loadProductsByIds: (ids: DTOLoadProductByIdentifier[]) => Promise<RequestedProductDetails[]>
}