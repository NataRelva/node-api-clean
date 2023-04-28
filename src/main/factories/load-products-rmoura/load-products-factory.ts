import { ProductPrismaRepository } from '../../../infra/db/prisma/product/product-prisma.repository';
import { ErrorHandlerAdapter } from '../../../utils/error-handler-adapter';
import { Controller } from '../../../presentation/protocols/controller';
import { PrismaClient } from '@prisma/client';
import { LoadProductsController } from '../../../presentation/controllers/pull-products/pull-products-rmoura-controller';
import { DbLoadProducts } from '../../../data/usecases/product/load-products/db-load-products.repository.usecase';
export const makePullProductsController = (): Controller => {
  const pullProduct = new ProductPrismaRepository(new PrismaClient())
  const pullProductsRmoura = new DbLoadProducts(pullProduct)
  const handleError = new ErrorHandlerAdapter()
  return new LoadProductsController(pullProductsRmoura, handleError)
}