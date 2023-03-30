import { ProductModel } from './../../../domain/models/product/product';
import { AccountModel } from './../../../domain/models/account/account';
import { CartModel } from './../../../domain/models/product/cart';
import { CreateCart } from './../../../domain/useCases/product/create-cart';
import { Order } from './../../../domain/models/logistics/order';
import { CheckProductAvailability } from './../../../domain/useCases/product/check-product-availability';
import { CreatCartController } from './create-cart-controller';
import { badRequest } from './../../helpers/http/http.helper';

const makeCheckProductAvailability = () => { 
  class CheckProductAvailabilityStub implements CheckProductAvailability { 
    async execute(order: Order[]): Promise<boolean> { 
      return true
    }
  }
  return new CheckProductAvailabilityStub()
}

const makeCreateCart = () => { 
  class CreateCartStub implements CreateCart {
    fakeAccount: AccountModel = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      cpfCnpj: 'any_cpfCnpj',
    }
    fakeProducts: ProductModel[] = [{
      id: 'any_id',
      name: 'any_name',
      code: 'any_code',
      provider: 'celmar',
      price: 1,
      weight: 1,
      unit: 'any_unit',
      obs: 'any_obs',
      package: [],
      category: [],
      mainCategory: [],
      subCategory: [],
    }]
    async execute(order: Order[]): Promise<CartModel> { 
      const fakeCartModel: CartModel = {
        id: 'any_id',
        account: this.fakeAccount,
        products: this.fakeProducts,
        total: 1
      }
      return fakeCartModel
    }
  }
  return new CreateCartStub()
}

const fakeHttpRequestOrder = {
  body: { 
    order: [ 
      {
        productId: 'any_id',
        quantity: 1
      }
    ]
  }
}

const makeSut = () => {
  const checkProductAvailability = makeCheckProductAvailability()
  const createCart = makeCreateCart()
  const sut = new CreatCartController(checkProductAvailability, createCart)
  return { sut }
}

describe('CreateCartController', () => {
  test('Should return 400 if no order is provided', async () => { 
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(badRequest(new Error('Pedido não informado')))
  })
  test('Should call CheckProductAvailability with correct values', async () => { 
    const { sut } = makeSut()
    const checkProductAvailabilitySpy = jest.spyOn(sut, 'handle')
    await sut.handle(fakeHttpRequestOrder)
    expect(checkProductAvailabilitySpy).toHaveBeenCalledWith(fakeHttpRequestOrder)
  })
  test('Should return 400 if CheckProductAvailability returns false', async () => { 
    const { sut } = makeSut()
    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(badRequest(new Error('Produto indisponível')))))
    const httpResponse = await sut.handle(fakeHttpRequestOrder)
    expect(httpResponse).toEqual(badRequest(new Error('Produto indisponível')))
  })
  test('Should call CreateCart with correct values', async () => { 
    const { sut } = makeSut()
    const createCartSpy = jest.spyOn(sut, 'handle')
    await sut.handle(fakeHttpRequestOrder)
    expect(createCartSpy).toHaveBeenCalledWith(fakeHttpRequestOrder)
  })
})