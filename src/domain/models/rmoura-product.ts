export interface RMouraPackage {
  id: string
  name: string
  products:  RmouraProduct[]
}

export interface RMouraUnit {
  id: string
  name: string
  products: RmouraProduct[]
}

export interface RMouraCategory {
  id: string
  name: string
  products: RmouraProduct[]
}

export interface RmouraProduct {
  id: string
  name: string
  weight: number
  unit: string
  obs: string
  package: string
  price: number
  categories: RMouraCategory[]
}