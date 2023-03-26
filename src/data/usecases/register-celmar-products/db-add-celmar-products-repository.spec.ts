import { RequestCelmarProduct } from './../../../domain/useCases/product/register-products-celmar';
import { AddCelmarProductsRepository } from './../../protocols/db/product/add-celmar-products.repository';
import { DBAddCelmarProductsRepository } from './db-add-celmar-products-repository';

interface SutTypes {
  sut: DBAddCelmarProductsRepository;
  addCelmarProductsRepositoryStub: AddCelmarProductsRepository;
}

const makeFakeRequest = (): RequestCelmarProduct[] => { 
  return [{
    code: 'any_code',
    name: 'any_name',
    price: 10,
    package: 'any_package',
    category_main: 'any_category_main',
    category_sub:  'any_category_sub',
  }]
}

const makeAddCelmarProductsRepository = (): AddCelmarProductsRepository => { 
  class AddCelmarProductsRepositoryStub implements AddCelmarProductsRepository {
    async addCelmar(data: RequestCelmarProduct[]): Promise<void> {
      return new Promise(resolve => resolve());
    }
  }
  return new AddCelmarProductsRepositoryStub();
}

const makeSut = (): SutTypes => { 
  const addCelmarProductsRepositoryStub = makeAddCelmarProductsRepository();
  const sut = new DBAddCelmarProductsRepository(addCelmarProductsRepositoryStub);
  return { sut, addCelmarProductsRepositoryStub };
}

describe('DbAddCelmarProductsRepository', () => { 
  it('should call AddCelmarProductsRepository with correct values', async () => { 
    const { sut, addCelmarProductsRepositoryStub } = makeSut();
    const addCelmarSpy = jest.spyOn(addCelmarProductsRepositoryStub, 'addCelmar');
    await sut.register(makeFakeRequest());
    expect(addCelmarSpy).toHaveBeenCalledWith(makeFakeRequest());
  })
})