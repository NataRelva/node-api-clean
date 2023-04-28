import { FilterRequest, ProductModel } from "../../../models/product";

export interface ProductResponse {
  currentPage: number;
  totalPages: number;
  tableProperties: {
    columns: string[];
  }
  products: ProductModel[]
}

export interface LoadProductsUsecase {
  execute(filterProps: FilterRequest, providerId: string): Promise<ProductResponse>
}