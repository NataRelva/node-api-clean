export interface Filter {
  categoryId: string,
  unitId: string,
  packageId: string,
}

export interface FilterRequest { 
  filter: Filter
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