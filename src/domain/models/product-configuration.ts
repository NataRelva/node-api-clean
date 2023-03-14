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

export interface FilterRequest { 
  filter: Filter
  paginator: Pagination
  text: string
}

export interface FilterResponse { 
  rmoura?: FilterProvider,
  celmar?: FilterProvider
}

export interface FilterProvider {
  categories: Property[]
  units: Property[]
  packages: Property[]
}

export interface Property {
  id: string
  name: string
}