import { AddProductsRepository } from './../../protocols/db/product/add-products.repository';
import { RegisterProduct, Product } from './../../../domain/useCases/product';
export class DbRegisterProducts implements RegisterProduct {
  constructor(
    private readonly addProductsRepository: AddProductsRepository,
  ) {}
  async registerProducts(rmouraProduct: Product[]): Promise<void> {
    await this.addProductsRepository.addProducts(rmouraProduct)
  }
}