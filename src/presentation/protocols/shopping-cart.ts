export interface ProductDataRequest {
  productId: string
  quantity: number
  discount?: number
}

export interface ShoppingCart {
  products: ProductDataRequest[]
}