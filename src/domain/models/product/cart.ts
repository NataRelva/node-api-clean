export interface CartItem { 
  id: string
  price: number
  quantity: number
  product: {
    productId: string
    provider: 'celmar' | 'rmoura',
  }
}

export interface Cart {
  id: string;
  itens: CartItem[];
}