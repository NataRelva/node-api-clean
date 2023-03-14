import { ErrorHandler } from './../../protocols/error-handler';
import { FilterResponse } from './../../../domain/models/product-configuration';
import { GetProductsFilter } from './../../../domain/useCases/get-products-filter';
import { BringAllFilteroOtionsRmouraController } from './bring-all-filter-options-rmoura-controller';


const makeBringAllFilterOptionsRmouraProviderStub = (): GetProductsFilter => {
  class BringAllFilterOptionsRmouraProviderStub implements GetProductsFilter {
    async exec(): Promise<FilterResponse> {
      return new Promise(resolve => resolve(makeFilterResponse()))
    }
  }
  return new BringAllFilterOptionsRmouraProviderStub()
}

const makeFilterResponse = (): FilterResponse => { 
  return {
    rmoura: { 
      categories: [ 
        { id: 'any_id', name: 'any_name' }
      ],
      units: [ 
        { id: 'any_id', name: 'any_name' }
      ],
      packages: [ 
        { id: 'any_id', name: 'any_name'}
      ]
    },
    celmar: {
      categories: [ 
        { id: 'any_id', name: 'any_name' }
      ],
      units: [ 
        { id: 'any_id', name: 'any_name' }
      ],
      packages: [ 
        { id: 'any_id', name: 'any_name'}
      ]
    }
  }
}

const makeErroHandler = (): ErrorHandler => { 
  class ErrorHandlerStub implements ErrorHandler { 
    handle(error: Error): any {
      return new Promise(resolve => resolve({ 
        statusCode: 500,
        body: error
      }))
    }
  }
  return new ErrorHandlerStub()
}

interface SutTypes { 
  sut: BringAllFilteroOtionsRmouraController,
  bringAllFilterOptionsRmouraProviderStub: GetProductsFilter
}

describe('BringAllFilterOptionsRmouraProviderController', () => { 
  const makeSut = (): SutTypes => { 
    const bringAllFilterOptionsRmouraProviderStub = makeBringAllFilterOptionsRmouraProviderStub()
    const errorHandler = makeErroHandler()
    const sut = new BringAllFilteroOtionsRmouraController(errorHandler,bringAllFilterOptionsRmouraProviderStub)
    return { sut, bringAllFilterOptionsRmouraProviderStub }
  }
  
  test('Should return 200 on success', async () => { 
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      filterResponse: makeFilterResponse()
    })
  })

  test('Should return 500 if bringAllFilterOptionsRmouraProvider throws', async () => { 
    const { sut, bringAllFilterOptionsRmouraProviderStub } = makeSut()
    jest.spyOn(bringAllFilterOptionsRmouraProviderStub, 'exec').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error())
  })

  test('Should return 500 if errorHandler throws', async () => { 
    const { sut, bringAllFilterOptionsRmouraProviderStub } = makeSut()
    jest.spyOn(bringAllFilterOptionsRmouraProviderStub, 'exec').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error())
  })
})