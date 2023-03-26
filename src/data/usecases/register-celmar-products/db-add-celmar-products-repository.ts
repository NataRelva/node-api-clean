import { AddCelmarProductsRepository } from './../../protocols/db/product/add-celmar-products.repository';
import { RegisterProductsCelmar, RequestCelmarProduct } from './../../../domain/useCases/product/register-products-celmar';
export class DBAddCelmarProductsRepository implements RegisterProductsCelmar {
  constructor(
    private readonly addCelmarProductsRepository: AddCelmarProductsRepository,
  ) {} 
  async register(products: RequestCelmarProduct[]): Promise<void> {
    await this.addCelmarProductsRepository.addCelmar(products);
  }
}