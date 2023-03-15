import { DbGetProductFilterCelmarRepository } from './../../../data/usecases/get-product-celmar-filter-repository/db-get-product-filter-celmar-repository';
import { BringAllFilteroOtionsCelmarController } from './../../../presentation/controllers/bring-all-filter-options-celmar/bring-all-filter-options-celmar-controller';
import { PrismaClient } from '@prisma/client';
import { ProductPrismaRepository } from './../../../infra/db/prisma/product/product-prisma.repository';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { Controller } from './../../../presentation/protocols/controller';
export const makeBringAllFilterOptionsCelmar = (): Controller => {
  const getProductFilterRepository = new ProductPrismaRepository(new PrismaClient())
  const getProductFilter = new DbGetProductFilterCelmarRepository(getProductFilterRepository)
  const errorHandler = new ErrorHandlerAdapter();
  return new BringAllFilteroOtionsCelmarController(errorHandler, getProductFilter);
}