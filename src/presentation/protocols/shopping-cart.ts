export interface ProductDataRequest {
  productId: string
  quantity: number
  provider: 'celmar' | 'rmoura',
  discount?: number
}

export interface ShoppingCart {
  products: ProductDataRequest[]
}