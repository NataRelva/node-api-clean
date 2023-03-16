import { ProductPrismaRepository } from './../../../infra/db/prisma/product/product-prisma.repository';
import { DbPullProductsCelmarRepository } from './../../../data/usecases/pull-product-celmar/db-pull-products-celmar-repository';
import { PrismaClient } from '@prisma/client';
export const makeDbPullProductsCelmarRepository = (): DbPullProductsCelmarRepository => {
  const prismaRepository = new ProductPrismaRepository(new PrismaClient())
  return new DbPullProductsCelmarRepository(prismaRepository)
}