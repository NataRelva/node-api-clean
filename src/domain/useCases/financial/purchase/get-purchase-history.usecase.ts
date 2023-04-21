export interface PurchaseHistory {
  id: number; // identificador único da compra
  date: Date; // data da compra
  products: Product[]; // array de produtos comprados
  totalAmount: number; // valor total da compra
  shippingAddress: Address; // endereço de entrega
}

interface Product {
  id: number; // identificador único do produto
  name: string; // nome do produto
  price: number; // preço unitário do produto
  quantity: number; // quantidade comprada do produto
}

interface Address {
  street: string; // nome da rua
  number: number; // número da residência
  complement?: string; // complemento do endereço (opcional)
  city: string; // cidade
  state: string; // estado
  country: string; // país
  zipCode: string; // código postal
}

export interface GetPurchaseHistory {
  execute(accountId: string): Promise<PurchaseHistory[]>
}