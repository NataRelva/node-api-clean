export interface PriceFilter {
  min: number,
  max: number
}

export interface Filter {
  categoryId: string,
  unitId: string,
  packageId: string,
  price: PriceFilter
}

export interface Pagination { 
  page: number
  limit: number
}

export interface CelmarFilter { 
  mainCategoryId?: string,
  subCategoryId?: string,
  packageId?: string,
  price?: PriceFilter
}

export interface FilterRequest {
  celmarFilter?: CelmarFilter
  filter: Filter
  paginator: Pagination
  text: string
}

export interface FilterResponse { 
  rmoura?: FilterProvider,
  celmar?: FilterProviderCelmar
}

export interface FilterProvider {
  categories: Property[]
  units: Property[]
  packages: Property[]
}

export interface FilterProviderCelmar {
  mainCategories: Property[]
  subCategories: Property[]
  packages: Property[]
}


export interface Property {
  id: string
  name: string
}