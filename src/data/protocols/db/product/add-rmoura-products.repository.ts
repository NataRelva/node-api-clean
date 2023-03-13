import { RmouraProduct } from './../../../../domain/useCases/register-rmoura-product';

export interface AddRmouraProductsRepository {
    addRmoura(products: RmouraProduct[]): Promise<void>
}