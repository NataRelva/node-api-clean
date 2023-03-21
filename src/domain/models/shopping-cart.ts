export interface DataProductCart { 
  id: string
  quantity: number
}

export interface ShoppingCart {
  products: {
    rmoura: DataProductCart[],
    celmar: DataProductCart[]
  }
}