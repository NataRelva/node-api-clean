import { Product } from './../../../../domain/useCases/product';

export interface AddProductsRepository {
    addProducts(products: Product[]): Promise<void>
}