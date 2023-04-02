import { ProductPrismaRepository } from './../../../infra/db/prisma/product/product-prisma.repository';
import { DbPullProductsRmouraRepository } from './../../../data/usecases/pull-product-rmoura/db-pull-products-rmoura-repository';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { Controller } from './../../../presentation/protocols/controller';
import { PrismaClient } from '@prisma/client';
import { PullProductsRmouraController } from '../../../presentation/controllers/pull-products/pull-products-rmoura-controller';
export const makePullProductsRmouraController = (): Controller => {
  const pullProduct = new ProductPrismaRepository(new PrismaClient())
  const pullProductsRmoura = new DbPullProductsRmouraRepository(pullProduct)
  const handleError = new ErrorHandlerAdapter()
  return new PullProductsRmouraController(pullProductsRmoura, handleError)
}