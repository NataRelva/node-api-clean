import { ProductPrismaRepository } from './../../../infra/db/prisma/product/product-prisma.repository';
import { DbRegisterRmouraProducts } from './../../../data/usecases/register-rmoura-products/db-register-rmoura-products';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { RegisterRmouraProductsController } from './../../../presentation/controllers/register-rmoura-products/register-rmoura -roducts';
import { Controller } from './../../../presentation/protocols/controller';
import { PrismaClient } from '@prisma/client';
export const makeCreateRmouraProduct = (): Controller => {
  const errorHandler = new ErrorHandlerAdapter();
  const addRmouraProductsRepository = new ProductPrismaRepository(new PrismaClient());
  const registerRmouraProducts = new DbRegisterRmouraProducts(addRmouraProductsRepository);
  return new RegisterRmouraProductsController(errorHandler, registerRmouraProducts);
}