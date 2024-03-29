import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { DbGetProductFilterRmouraRepository } from './../../../data/usecases/get-product-rmoura-filter-repository/db-get-product-filter-repository';
import { PrismaClient } from '@prisma/client';
import { ProductPrismaRepository } from './../../../infra/db/prisma/product/product-prisma.repository';
import { Controller } from './../../../presentation/protocols/controller';
import { BringAllFilteroOtionsRmouraController } from './../../../presentation/controllers/bring-all-filter-options-rmoura/bring-all-filter-options-rmoura-controller';
export const makeBringAllFilterOptionsRmoura = (): Controller => {
  const getProductFilterRepository = new ProductPrismaRepository(new PrismaClient())
  const getProductFilter = new DbGetProductFilterRmouraRepository(getProductFilterRepository)
  const errorHandler = new ErrorHandlerAdapter();
  return new BringAllFilteroOtionsRmouraController(errorHandler, getProductFilter);
}