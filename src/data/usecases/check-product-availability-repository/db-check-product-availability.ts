import { Order } from "../../../domain/models/logistics/order"
import { ProductModel } from "../../../domain/models/product"
import { CheckProductAvailability } from "../../../domain/useCases/product/check-product-availability"
import { CheckProductAvailabilityRepository } from "../../protocols/db/product/check-product-availability-repository"

export class DbCheckProductAvailability implements CheckProductAvailability {
  constructor(
    private readonly checkProductAvailabilityRepository: CheckProductAvailabilityRepository
  ) {}

  async execute(data: Order[]): Promise<boolean> {
    const product = await this.checkProductAvailabilityRepository.checkAvailability(data)
    return product
  }
}