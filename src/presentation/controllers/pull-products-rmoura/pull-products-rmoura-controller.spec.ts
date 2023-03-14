import { RmouraProductModel } from './../../../domain/models/rmoura-product';
import { FilterRequest } from './../../../domain/models/product-configuration';
import { PullProductsRmouraController } from './pull-products-rmoura-controller';
import { HttpRequest } from './../../protocols/http';
import { MissingParamError } from './../../errors/missing-param.error';
import { PullProductsRmoura } from './../../../domain/useCases/pull-products-rmoura';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ok, badRequest } from './../../helpers/http/http.helper';

const makeFakeProducts = (): RmouraProductModel[] => {
  return [{
    id: 'any_id',
    name: 'any_name',
    weight: 0,
    unit: 'any_unit',
    obs: 'any_obs',
    package: 'any_package',
    price: 100,
    categories: []
  }]
}

const makeRequest = (): HttpRequest => { 
  const httpRequest: HttpRequest = {
    body: {
      "filter": {
        "unitId": "b4cde26a-46bd-4804-bfa5-e711993e233d",
        "categoryId": "",
        "packageId": "",
        "price": {
          "min": 0,
          "max": 2000
        }
      },
      "paginator": {
        "page": 1,
        "limit": 10
      },
      "text": "a"
    }
  }
  return httpRequest
}

const makeSut = () => {
  class PullProductsRmouraStub implements PullProductsRmoura {
    async pull(filter: FilterRequest): Promise<RmouraProductModel[]> {
      return new Promise((resolve) => resolve(makeFakeProducts()))
    }
  }
  const pullProductsRmouraStub = new PullProductsRmouraStub()
  const handleErrorStub = new ErrorHandlerAdapter()
  const sut = new PullProductsRmouraController(
    pullProductsRmouraStub,
    handleErrorStub,
  )
  return { sut, pullProductsRmouraStub, handleErrorStub }
}

describe('PullProductsRmouraController', () => {
  test('Should call PullProductsRmoura with correct values', async () => {
    const { sut, pullProductsRmouraStub } = makeSut()
    const pullSpy = jest.spyOn(pullProductsRmouraStub, 'pull')
    const httpRequest: HttpRequest = {
      body: {
        "filter": {
          "unitId": "b4cde26a-46bd-4804-bfa5-e711993e233d",
          "categoryId": "",
          "packageId": "",
          "price": {
            "min": 0,
            "max": 2000
          }
        },
        "paginator": {
          "page": 1,
          "limit": 10
        },
        "text": "a"
      }
    }
    await sut.handle(httpRequest)
    expect(pullSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if no filter is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: undefined
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('filter')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(ok(makeFakeProducts()))
  })
})