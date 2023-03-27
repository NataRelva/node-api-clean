import { ProductCheckOutDetails } from './../../../models/logistics/product-check-out-data';
export interface LoadProductsDetails {
  load: (cartId: string) => Promise<ProductCheckOutDetails[]>
}