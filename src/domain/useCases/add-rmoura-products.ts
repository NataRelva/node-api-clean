import { RmouraProduct } from './../models/rmoura-product';
export interface AddRmouraProducts {
  add(rmouraProducts: RmouraProduct[]): Promise<void>
}