import { RmouraProductModel } from './../../../../domain/models/rmoura-product';
import { PrismaClient } from '@prisma/client';
import { ProductPrismaRepository } from './product-prisma.repository';

const makeFakeRmouraProducts = (): any => { 
  return [{
    name: 'any_name',
    weight: 1,
    unit: 'any_unit',
    obs: 'any_obs',
    package: 'any_package',
    price: 1,
    categories: 'any_categories',
  }]
}

jest.mock('@prisma/client', () => { 
  return {
    PrismaClient: jest.fn().mockImplementation(() => { 
      return {
        rMouraProduct: {
          create: jest.fn().mockImplementation(() => { 
            return {
              id: 'any_id',
              name: 'any_name',
              weight: 1,
              unit: 'any_unit',
              obs: 'any_obs',
              package: 'any_package',
              price: 1,
              categories: 'any_categories',
            }
          }),
          findUnique: jest.fn().mockImplementation(() => {
            return {
              id: 'any_id',
              name: 'any_name',
              weight: 1,
              unit: 'any_unit',
              obs: 'any_obs',
              package: 'any_package',
              price: 1,
              categories: 'any_categories',
            }
          }),
          deleteMany: jest.fn().mockImplementation(() => { 
            return {
              count: 1
            }
          })
        },
        rMouraCategory: { 
          findUnique: jest.fn().mockImplementation(() => { 
            return {
              id: 'any_id',
              name: 'any_name',
            }
          }),
        },
        rMouraUnit: { 
          findUnique: jest.fn().mockImplementation(() => { 
            return {
              id: 'any_id',
              name: 'any_name',
            }
          }),
        },
        rMouraPackage: { 
          findUnique: jest.fn().mockImplementation(() => {
            return {
              id: 'any_id',
              name: 'any_name',
            }
          })
        },
        rMouraCategoryProduct: {
          create: jest.fn().mockImplementation(() => { 
            return {
              id: 'any_id',
              rMouraProductId: 'any_product_id',
              rMouraCategoryId: 'any_category_id',
            }
          })
        },
        rMouraUnitProduct: { 
          create: jest.fn().mockImplementation(() => { 
            return {
              id: 'any_id',
              rMouraProductId: 'any_product_id',
              rMouraUnitId: 'any_unit_id',
            }
          })
        },
        rMouraPackageProduct: { 
          create: jest.fn().mockImplementation(() => {
            return {
              id: 'any_id',
              rMouraProductId: 'any_product_id',
              rMouraPackageId: 'any_package_id',
            }
          })
        }
      }
    })
  }
})

const makePrismaStub = (): PrismaClient => { 
  return new PrismaClient();
}

interface SutTypes {
  sut: ProductPrismaRepository;
  prismaStub: PrismaClient;
}
const makeSut = (): SutTypes => { 
  const prismaStub = makePrismaStub();
  const sut = new ProductPrismaRepository(prismaStub);
  return { sut, prismaStub };
}

describe('ProductPrismaRepository', () => { 
  test('Should call PrismaClient with correct values', async () => { 
    const { sut, prismaStub } = makeSut();
    const addSpy = jest.spyOn(prismaStub.rMouraProduct, 'create');
    await sut.addRmoura(makeFakeRmouraProducts());
    expect(addSpy).toHaveBeenCalledWith({
      data: { 
        name: 'any_name',
        weight: 1,
        obs: 'any_obs',
        price: 1,
      }
    })
  })

  test('Should return an RmouraProductModel on success', async () => { 
    const { sut } = makeSut();
    const response = await sut.addRmoura(makeFakeRmouraProducts());
    expect(response).toEqual(undefined)
  })

  test('Should throw if PrismaClient throws', async () => { 
    const { sut, prismaStub } = makeSut();
    jest.spyOn(prismaStub.rMouraProduct, 'create').mockImplementationOnce(() => { 
      throw new Error();
    })
    const promise = sut.addRmoura(makeFakeRmouraProducts());
    await expect(promise).rejects.toThrow();
  })

});