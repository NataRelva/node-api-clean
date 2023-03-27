export interface Product {
  productId: string
  provider: 'celmar' | 'rmoura',
}

export interface CartItem { 
  id: string
  price: number
  quantity: number
  product: Product
}

export interface Cart {
  id: string;
  itens: CartItem[];
}