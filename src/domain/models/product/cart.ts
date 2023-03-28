export interface Item {
  id: string
  productId: string,
  provider: 'celmar' | 'rmoura',
}

export interface CartItem { 
  id: string
  price: number
  quantity: number
  item: Item
}

export interface Cart {
  id: string;
  itens: CartItem[];
}