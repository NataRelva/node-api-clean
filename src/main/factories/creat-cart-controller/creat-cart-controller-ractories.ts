import { PrismaClient } from "@prisma/client";
import { DbCreateCartRepository } from "../../../data/usecases/logistics/create-cart-repository/db-create-cart-repository";
import { FinancialRepository } from "../../../infra/db/prisma/financial-repository/financial-repository";
import { CreatCartController } from "../../../presentation/controllers/create-cart/create-cart-controller";
import { Controller } from "../../../presentation/protocols";
import { DbCheckProductAvailability } from "../../../data/usecases/check-product-availability-repository/db-check-product-availability";

const makeCreateCartRepository = (): DbCreateCartRepository => { 
  const createCartRepository = new FinancialRepository(new PrismaClient())
  const calculateOrderTotal = new FinancialRepository(new PrismaClient())
  return new DbCreateCartRepository(createCartRepository, calculateOrderTotal)
}

const makeCheckProductAvailability = (): DbCheckProductAvailability => { 
  const checkProductAvailabilityRepository = new FinancialRepository(new PrismaClient())
  return new DbCheckProductAvailability(checkProductAvailabilityRepository)
}

export const makeCreateCartController = (): Controller => {
  const checkProductAvailability = makeCheckProductAvailability()
  const createCart = makeCreateCartRepository()
  return new CreatCartController(checkProductAvailability ,createCart);
}