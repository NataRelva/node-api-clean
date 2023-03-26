export interface RmouraProduct { 
  code: number,
  name: string,
  weight: number,
  obs: string,
  unit: string,
  price: number,
  package: string,
}

export interface RegisterRmouraProduct {
  register(rmouraProduct: RmouraProduct[]): Promise<void>
}