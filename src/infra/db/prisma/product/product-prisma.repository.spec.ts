import { RmouraProduct } from './../../../../domain/useCases/register-rmoura-product';
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



const makePrismaStub = (): PrismaClient => {
  class PrismaClientStub extends PrismaClient {
    constructor() {
      super();
    }
  }
  return new PrismaClientStub();
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
    const createSpy = jest.spyOn(prismaStub.rmouraProduct, 'create');
    await sut.addRmoura(makeFakeRmouraProducts());
    expect(createSpy).toHaveBeenCalledWith({ 
      "data": { 
        "category": { "connectOrCreate": { "create": { "name": "any_package" }, "where": { "name": "any_package" } } }, 
        "package": { "connectOrCreate": { "create": { "name": "any_package" }, "where": { "name": "any_package" } } }, 
        "unit": { "connectOrCreate": { "create": { "name": "any_unit" }, "where": { "name": "any_unit" } } }, 
        "name": "any_name",
        "obs": "any_obs", 
        "price": 1, 
        "weight": 1 
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
    jest.spyOn(prismaStub.rmouraProduct, 'create').mockImplementationOnce(() => {
      throw new Error();
    })
    const promise = sut.addRmoura(makeFakeRmouraProducts());
    await expect(promise).rejects.toThrow();
  })

});