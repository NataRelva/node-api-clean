import { CreateOrder } from './../../../domain/useCases/financial/create-order';
import { CreatePurchaseOrderController } from './create-purchase-order-controller';

interface SutTypes {
  sut: CreatePurchaseOrderController,
  createOrder: CreateOrder
}

const httpRequest = {
  body: {
    products: {
      rmoura: [
        {
          id: 'any_id',
          quantity: 1
        }
      ],
      celmar: [
        {
          id: 'any_id',
          quantity: 1
        }
      ]
    }
  }
}

const makeCreateOrder = (): CreateOrder => { 
  class CreateOrderStub implements CreateOrder {
    async create (data: any): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new CreateOrderStub()
}

const makeSut = (): SutTypes => {
  const createOrder = makeCreateOrder()
  const sut = new CreatePurchaseOrderController(createOrder, null)
  return { 
    sut,
    createOrder
  }
}

describe('CreatePurchaseOrderController', () => { 
  test('Should return 400 if no products are provided', async () => { 
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        products: {}
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: products'))
  })

  test('Should call CreateOrder with correct values', async () => { 
    const { sut } = makeSut()
    const createOrderSpy = jest.spyOn(sut, 'handle')
    await sut.handle(httpRequest)
    expect(createOrderSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 500 if CreateOrder throws', async () => { 
    const { sut, createOrder } = makeSut()
    jest.spyOn(createOrder, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})