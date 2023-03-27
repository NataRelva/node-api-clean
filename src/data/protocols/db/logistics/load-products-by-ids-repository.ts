import { RmouraProductModel } from './../../../../domain/models/product/rmoura-product';
import { CelmarProductModel } from './../../../../domain/models/product/celmar-product';
export interface DTOLoadProductByIdentifier {
  id: string,
  quantity: number,
  provider: string
}

export interface DTOResponseLoadProductByIdentifier { 
  celmar: CelmarProductModel[],
  rmoura: RmouraProductModel[]
}

export interface LoadProductsByIdsRepository {
  loadByIds: (ids: DTOLoadProductByIdentifier[]) => Promise<DTOResponseLoadProductByIdentifier>
}