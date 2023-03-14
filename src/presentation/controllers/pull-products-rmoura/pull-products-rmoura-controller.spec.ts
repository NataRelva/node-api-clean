import { RmouraProduct } from './../../../domain/useCases/register-rmoura-product';
import { FilterRequest } from './../../../domain/models/product-configuration';
import { PullProductsRmouraController } from './pull-products-rmoura-controller';
import { HttpRequest } from './../../protocols/http';
import { MissingParamError } from './../../errors/missing-param.error';
import { PullProductsRmoura } from './../../../domain/useCases/pull-products-rmoura';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ok, badRequest } from './../../helpers/http/http.helper';

const makeFakeProducts = (): RmouraProduct[] => { 
  return [{
    code: 100,
    name: 'any_name',
    weight: 100,
    obs: 'any_obs',
    unit: 'any_unit',
    price: 100,
    package: 'any_package',
  }]
}

const makeSut = () => {
  class PullProductsRmouraStub implements PullProductsRmoura {
    async pull(filter: FilterRequest): Promise<RmouraProduct[]> {
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
        filter: {
          code: 100,
          name: 'any_name',
          weight: 100,
          obs: 'any_obs',
          unit: 'any_unit',
          price: 100,
          package: 'any_package',
        }
      }
    }
    await sut.handle(httpRequest)
    expect(pullSpy).toHaveBeenCalledWith(httpRequest.body.filter)
  })

  test('Should return 400 if no filter is provided', async () => { 
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        filter: undefined
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('filter')))
  })

  test('Should return 200 if valid data is provided', async () => { 
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        filter: {
          code: 100,
          name: 'any_name',
          weight: 100,
          obs: 'any_obs',
          unit: 'any_unit',
          price: 100,
          package: 'any_package',
        }
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok(makeFakeProducts()))
  })
})