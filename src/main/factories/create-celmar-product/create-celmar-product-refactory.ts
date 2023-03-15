import { DBAddCelmarProductsRepository } from './../../../data/usecases/register-celmar-products/db-add-celmar-products-repository';
import { ProductPrismaRepository } from './../../../infra/db/prisma/product/product-prisma.repository';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { Controller } from './../../../presentation/protocols/controller';
import { PrismaClient } from '@prisma/client';
import { RegisterProductsCelmarController } from '../../../presentation/controllers/register-celmar-products/register-products-celmar-controller';
export const makeCreateCelmarProduct = (): Controller => {
  const errorHandler = new ErrorHandlerAdapter();
  const addCelmarProductsRepository = new ProductPrismaRepository(new PrismaClient());
  const registerCelmarProducts = new DBAddCelmarProductsRepository(addCelmarProductsRepository);
  return new RegisterProductsCelmarController(errorHandler, registerCelmarProducts);
}