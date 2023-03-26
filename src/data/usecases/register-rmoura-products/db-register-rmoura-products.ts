import { AddRmouraProductsRepository } from './../../protocols/db/product/add-rmoura-products.repository';
import { RegisterRmouraProduct, RmouraProduct } from './../../../domain/useCases/product';
export class DbRegisterRmouraProducts implements RegisterRmouraProduct {
  constructor(
    private readonly addRmouraProductsRepository: AddRmouraProductsRepository,
  ) {}
  async register(rmouraProduct: RmouraProduct[]): Promise<void> {
    await this.addRmouraProductsRepository.addRmoura(rmouraProduct)
  }
}