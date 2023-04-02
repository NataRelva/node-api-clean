import { ProductPrismaRepository } from './../../../infra/db/prisma/product/product-prisma.repository';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { Controller } from './../../../presentation/protocols/controller';
import { PrismaClient } from '@prisma/client';
import { DbRegisterProducts } from '../../../data/usecases/register-rmoura-products/db-register-rmoura-products';
import { RegisterProductsController } from '../../../presentation/controllers/register-rmoura-products/register-products';

export const makeRegisterProduct = (): Controller => {
  const errorHandler = new ErrorHandlerAdapter();
  const addRmouraProductsRepository = new ProductPrismaRepository(new PrismaClient());
  const registerRmouraProducts = new DbRegisterProducts(addRmouraProductsRepository);
  return new RegisterProductsController(errorHandler, registerRmouraProducts);
}