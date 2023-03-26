export interface CelmarProductModel {
  id: string;
  code: string;
  name: string;
  package: CelmarPackage[];
  price: number;
  mainCategory: CelmarCategory[];
  subCategory: CelmarCategory[];
}

export interface CelmarCategory {
  id: string;
  name: string;
}

export interface CelmarPackage {
  id: string;
  name: string;
}
