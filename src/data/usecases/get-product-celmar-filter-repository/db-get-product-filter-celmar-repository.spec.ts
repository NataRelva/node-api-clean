import { GetProductFilterRepository } from './../../protocols/db/product/get-products-filter.repository';
import { DbGetProductFilterCelmarRepository } from './db-get-product-filter-celmar-repository';

interface SutTypes {
  sut: DbGetProductFilterCelmarRepository
  getProductFilterRepositoryStub: GetProductFilterRepository
}
describe('DbGetProductFilterCelmarRepository', () => {
  const makeGetProductFilterRepositoryStub = (): GetProductFilterRepository => { 
    class GetProductFilterRepositoryStub implements GetProductFilterRepository { 
      async getCelmar(): Promise<any> { 
        return new Promise(resolve => resolve({ 
          data: { 
            categories: [], 
            brands: [], 
            colors: [], 
            sizes: [] 
          } 
        })) 
      }
      async getRmoura(): Promise<any> { }
    } 
    return new GetProductFilterRepositoryStub()
  }
  const makeSut = (): SutTypes => { 
    const getProductFilterRepositoryStub = makeGetProductFilterRepositoryStub() 
    const sut = new DbGetProductFilterCelmarRepository(getProductFilterRepositoryStub) 
    return { 
      sut, 
      getProductFilterRepositoryStub 
    }
  }
  test('Should call GetProductFilterRepository with correct values', async () => { 
    const { sut, getProductFilterRepositoryStub } = makeSut() 
    const getSpy = jest.spyOn(getProductFilterRepositoryStub, 'getCelmar') 
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
    jest.spyOn(getProductFilterRepositoryStub, 'getCelmar').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error()))) 
    const promise = sut.exec() 
    await expect(promise).rejects.toThrow()
  })
})