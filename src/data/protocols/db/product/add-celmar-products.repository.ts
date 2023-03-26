import { RequestCelmarProduct } from './../../../../domain/useCases/product/register-products-celmar';
export interface AddCelmarProductsRepository { 
  addCelmar(data: RequestCelmarProduct[]): Promise<void>
}