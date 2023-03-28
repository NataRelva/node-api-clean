import { ShoppingCart } from './../../../../presentation/protocols/shopping-cart';

import { ProductModel } from './../../../../domain/models/product/product';
import { DbProductCheckInRepository } from './db-product-checkIn-repository';
import { LoadProductsByIdsRepository, RequestedProductDetails, DTOLoadProductByIdentifier } from './../../../protocols/db/logistics/load-products-by-ids-repository';
import { PrismaClient } from '@prisma/client';

interface SutTypes { 
  sut: DbProductCheckInRepository,
  loadProductsByIdsRepositoryStub: LoadProductsByIdsRepository
}


const fakeProductModel = (): ProductModel => { 
  return {
    id: 'any_id',
    name: 'any_name',
    code: 'any_code',
    provider: 'celmar',
    price: 0,
    weight: 0,
    unit: 'any_code',
    obs: 'any_code',
    package: [],
    category: [],
    mainCategory: [],
    subCategory: [],
  }
}

const makeLoadProductsByIdsRepositoryStub = (): LoadProductsByIdsRepository => { 
  class LoadProductsByIdsRepositoryStub implements LoadProductsByIdsRepository { 
    async loadProductsByIds(ids: DTOLoadProductByIdentifier[]): Promise<RequestedProductDetails[]> { 
      return [
        {
          product: fakeProductModel(),
          quantity: 0,
          discount: 0
        }
      ]
    }
  }
  return new LoadProductsByIdsRepositoryStub();
}

const makeSut = (): SutTypes => { 
  const loadProductsByIdsRepositoryStub = makeLoadProductsByIdsRepositoryStub();
  const sut = new DbProductCheckInRepository(loadProductsByIdsRepositoryStub);
  return { sut, loadProductsByIdsRepositoryStub };
}

const makeFakeShoppingCart = (): ShoppingCart  => { 
  return {
    products: [
      { 
        discount: 0,
        productId: 'any_id',
        quantity: 10,
      }
    ]
  }
}

describe('DbProductCheckInRepository', () => { 
  test('Should call LoadProductsByIdsRepository with correct values', async () => { 
    const { sut, loadProductsByIdsRepositoryStub } = makeSut();
    const loadProductsByIdsSpy = jest.spyOn(loadProductsByIdsRepositoryStub, 'loadProductsByIds');
    await sut.checkIn(makeFakeShoppingCart());
    expect(loadProductsByIdsSpy).toHaveBeenCalledWith([{ id: 'any_id', quantity: 10, discount: 0 }]);
  })
})