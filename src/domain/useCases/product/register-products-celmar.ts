export interface RequestCelmarProduct {
  code: string;
  name: string;
  price: number;
  package: string;
  category_main: string;
  category_sub: string;
}

export interface RegisterProductsCelmar { 
  register(products: RequestCelmarProduct[]): Promise<void>
}