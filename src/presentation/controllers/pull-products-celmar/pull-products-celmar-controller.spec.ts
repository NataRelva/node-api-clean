import { PullProductsCelmarController } from './pull-products-celmar-controller';
import { CelmarProductModel } from './../../../domain/models/celmar-product';
import { RequestCelmarProduct } from './../../../domain/useCases/register-products-celmar';
import { PullProductsRmouraController } from './../pull-products-rmoura/pull-products-rmoura-controller';
import { PullProductsCelmar } from './../../../domain/useCases/pull-products-celmar';
import { RmouraProductModel } from './../../../domain/models/rmoura-product';
import { FilterRequest } from './../../../domain/models/product-configuration';
import { HttpRequest } from './../../protocols/http';
import { MissingParamError } from './../../errors/missing-param.error';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ok, badRequest } from './../../helpers/http/http.helper';

const makeFakeProducts = (): CelmarProductModel[] => {
  return [{
    id: "any_id",
    code: "123",
    name: "any_name",
    price: 10,
    package: [{
      id: "any_id",
      name: "any_name"
    }],
    mainCategory: [{
      id: "any_id",
      name: "any_name"
    }],
    subCategory: [{
      id: "any_id",
      name: "any_name"
    }]
  },]
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
  class PullProductsRmouraStub implements PullProductsCelmar {
    async pull(filter: FilterRequest): Promise<CelmarProductModel[]> {
      return new Promise((resolve) => resolve(makeFakeProducts()))
    }
  }
  const pullProductsRmouraStub = new PullProductsRmouraStub()
  const handleErrorStub = new ErrorHandlerAdapter()
  const sut = new PullProductsCelmarController(
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