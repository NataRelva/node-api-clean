export interface RMouraPackage {
  id: string
  name: string
  products:  RmouraProductModel[]
}

export interface RMouraUnit {
  id: string
  name: string
  products: RmouraProductModel[]
}

export interface RMouraCategory {
  id: string
  name: string
  products: RmouraProductModel[]
}

export interface RmouraProductModel {
  id: string
  name: string
  weight: number
  unit: string
  obs: string
  package: string
  price: number
  categories: RMouraCategory[]
}