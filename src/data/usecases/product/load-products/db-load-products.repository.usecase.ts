import { FilterRequest } from "../../../../domain/models/product";
import { LoadProductsUsecase, ProductResponse } from "../../../../domain/useCases/product/load-products/load-products.usecase";
import { ProductsRepository } from "../../../protocols/db/product";

export class DbLoadProducts implements LoadProductsUsecase {
  constructor(
    private products: ProductsRepository
  ) { }
  async execute(filterProps: FilterRequest, providerId: string): Promise<ProductResponse> {
    return await this.products.loadByProviderID(filterProps, providerId);
  }
}