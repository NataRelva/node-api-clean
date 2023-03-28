export interface Product { 
  code: string,
  name: string,
  weight: number,
  obs: string,
  unit: string,
  price: number,
  package: string;
  provider: 'rmoura' | 'celmar'
  category_main: string;
  category_sub: string;
}

export interface RegisterProduct {
  registerProducts(products: Product[]): Promise<void>
}