import { GetProductFilterRepository } from './../../protocols/db/product/get-products-filter.repository';
import { DbGetProductFilterRepository } from './db-get-product-filter-repository';

interface SutTypes {
  sut: DbGetProductFilterRepository
  getProductFilterRepositoryStub: GetProductFilterRepository
}
describe('DbGetProductFilterRepository', () => {
  const makeGetProductFilterRepositoryStub = (): GetProductFilterRepository => { 
    return new class GetProductFilterRepositoryStub implements GetProductFilterRepository {	 
      async get(): Promise<any> { 
        return new Promise(resolve => resolve({ 
          data: { 
            categories: [], 
            brands: [], 
            colors: [], 
            sizes: [] 
          } 
        })) 
      }
    }
  }
  const makeSut = (): SutTypes => { 
    const getProductFilterRepositoryStub = makeGetProductFilterRepositoryStub() 
    const sut = new DbGetProductFilterRepository(getProductFilterRepositoryStub) 
    return { 
      sut, 
      getProductFilterRepositoryStub 
    }
  }
  test('Should call GetProductFilterRepository with correct values', async () => { 
    const { sut, getProductFilterRepositoryStub } = makeSut() 
    const getSpy = jest.spyOn(getProductFilterRepositoryStub, 'get') 
    await sut.exec() 
    expect(getSpy).toHaveBeenCalled() 
  })

  test('Should return a FilterResponse on success', async () => { 
    const { sut } = makeSut() 
    const response = await sut.exec() 
    expect(response).toEqual({ 
      data: { 
        categories: [], 
        brands: [], 
        colors: [], 
        sizes: [] 
      } 
    }) 
  })

  test('Should throw if GetProductFilterRepository throws', async () => { 
    const { sut, getProductFilterRepositoryStub } = makeSut() 
    jest.spyOn(getProductFilterRepositoryStub, 'get').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error()))) 
    const promise = sut.exec() 
    await expect(promise).rejects.toThrow()
  })
})