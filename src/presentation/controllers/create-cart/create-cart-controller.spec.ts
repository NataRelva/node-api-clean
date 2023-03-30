import { CreateCart } from './../../../domain/useCases/logistics/create-cart/create-cart';
import { ProductModel } from './../../../domain/models/product/product';
import { AccountModel } from './../../../domain/models/account/account';
import { CartModel } from './../../../domain/models/product/cart';
import { Order } from './../../../domain/models/logistics/order';
import { CheckProductAvailability } from './../../../domain/useCases/product/check-product-availability';
import { CreatCartController } from './create-cart-controller';
import { badRequest, serverError } from './../../helpers/http/http.helper';

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
    fakeCartItem = [{ 
      id: 'any_id',
      product: this.fakeProducts[0],
      quantity: 1
    }]
    async execute(order: Order[]): Promise<CartModel> { 
      const fakeCartModel: CartModel = {
        id: 'any_id',
        account: this.fakeAccount,
        cartItem: this.fakeCartItem,        
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
    ],
    accountId: 'any_id'
  }
}

const makeSut = () => {
  const checkProductAvailability = makeCheckProductAvailability()
  const createCart = makeCreateCart()
  const sut = new CreatCartController(checkProductAvailability, createCart)
  return { sut, createCart, checkProductAvailability}
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
  test('Should return 500 if CheckProductAvailability throws', async () => { 
    const { sut, checkProductAvailability } = makeSut()
    jest.spyOn(checkProductAvailability, 'execute').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(fakeHttpRequestOrder)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 500 if CreateCart throws', async () => { 
    const { sut, createCart } = makeSut()
    jest.spyOn(createCart, 'execute').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(fakeHttpRequestOrder)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should call CreateCart with correc value', async () => { 
    const {sut, createCart} = makeSut()
    const spyOnCreateCart = jest.spyOn(createCart, 'execute')
    await sut.handle(fakeHttpRequestOrder)
    expect(spyOnCreateCart).toHaveBeenCalledWith(fakeHttpRequestOrder.body.order, fakeHttpRequestOrder.body.accountId)
  })
  test('Should return CartModel if CreateCart success', async () => { 
    const { sut, createCart } = makeSut()
    const responseSpy = jest.spyOn(createCart, 'execute')
    await sut.handle(fakeHttpRequestOrder)
    expect(responseSpy).toHaveBeenCalledWith(fakeHttpRequestOrder.body.order, fakeHttpRequestOrder.body.accountId)
  })
  test('Should return 200 on success', async () => { 
    const { sut } = makeSut()
    const httpResponse = await sut.handle(fakeHttpRequestOrder)
    expect(httpResponse.statusCode).toBe(200)
  })
  test('Should return 400 if accountId not provider', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { order: [] } })
    expect(httpResponse).toEqual(badRequest(new Error('Conta não informada')))
  })
})