export interface Package {
  id: string
  name: string
  products:  ProductModel[]
}

export interface Unit {
  id: string
  name: string
  products: ProductModel[]
}

export interface Category {
  id: string
  name: string
  products: ProductModel[]
}

export interface ProductModel {
  id: string
  name: string
  code: string
  provider: 'celmar' | 'rmoura'
  price: number
  weight: number
  unit: string
  obs: string
  package: Package[];
  category: Category[];
  mainCategory: Category[];
  subCategory: Category[];
}