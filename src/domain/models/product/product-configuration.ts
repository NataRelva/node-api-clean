export interface PriceFilter {
  min: number,
  max: number
}

export interface Filter {
  price: PriceFilter
  unitId: string,
  packageId: string,
  mainCategoryId: string,
  subCategoryId: string,
  categoryId: string,
}

export interface Pagination { 
  page: number
  limit: number
}

export interface FilterRequest {
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