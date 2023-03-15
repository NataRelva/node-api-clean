import { RequestCelmarProduct } from './../../../../domain/useCases/register-products-celmar';
export interface AddCelmarProductsRepository { 
  addCelmar(data: RequestCelmarProduct[]): Promise<void>
}