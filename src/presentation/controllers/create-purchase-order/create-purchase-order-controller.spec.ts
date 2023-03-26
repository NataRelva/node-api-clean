import { ShoppingCart } from './../../protocols/shopping-cart';
import { ProductCheckInData } from './../../../domain/models/logistics/product-check-in-data';
import { Order } from './../../../domain/models/financial/order';
import { CreatePurchase, CreatePrePurchase, ProductCheckIn, ProductCheckOut} from './protocols';
import { CreatePurchaseOrderController } from './create-purchase-order-controller';


const fakeShoppingCart = (): ShoppingCart => ({ 
  products: [{
    productId: 'any_id',
    quantity: 1,
    provider: 'celmar',
    discount: 0.1,
  }]
})

const fakeProductCheckInData = (): ProductCheckInData[] => ([{
    productId: 'any_id',
    quantity: 1,
    provider: 'celmar',
    discount: 0.1,
    status: {
      availabilityCheck: true,
      conditionCheck: true,
      expirationDateCheck: true,
      serialNumberCheck: true,
      priceCheck: true,
      documentationCheck: true,
      storageCheck: true,
      identificationCheck: true,
    }
}])

const  makeCreatePurchase = () => {
  class CreatePurchaseStub implements CreatePurchase {
    async create (data: Order): Promise<any> {
      return new Promise(resolve => resolve(fakeProductCheckInData()))
    }
  }
  return new CreatePurchaseStub()
}
const  makeCreatePrePurchase = () => {
  class CreatePrePurchaseStub implements CreatePrePurchase {
    async create (data: ProductCheckInData[]): Promise<any> {
      return new Promise(resolve => resolve({}))
    }
  }
  return new CreatePrePurchaseStub()
}
const  makeProductCheckIn = () => {
  class ProductCheckInStub implements ProductCheckIn {
    async checkIn (data: ShoppingCart): Promise<any> {
      return new Promise(resolve => resolve(
        fakeProductCheckInData()
      ))
    }
  }
  return new ProductCheckInStub()
}
const  makeProductCheckOut = () => {
  class ProductCheckOutStub implements ProductCheckOut {
    async checkout (data: any): Promise<any> {
      return new Promise(resolve => resolve({}))
    }
  }
  return new ProductCheckOutStub()
}

interface SutTypes {
  sut: CreatePurchaseOrderController,
  createPurchase: CreatePurchase,
  createPrePurchase: CreatePrePurchase,
  productCheckIn: ProductCheckIn,
  productCheckOut: ProductCheckOut,
}

const makeSut = (): SutTypes => {
  const  createPurchase = makeCreatePurchase()
  const  createPrePurchase = makeCreatePrePurchase()
  const  productCheckIn = makeProductCheckIn()
  const  productCheckOut = makeProductCheckOut()
  const sut = new CreatePurchaseOrderController(createPurchase,createPrePurchase,productCheckIn,productCheckOut) 
  return { 
    sut,
    createPurchase,
    createPrePurchase,
    productCheckIn,
    productCheckOut
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

  test('Should call ProductCheckIn with correct values', async () => { 
    const { sut, productCheckIn } = makeSut() 
    const checkInSpy = jest.spyOn(productCheckIn, 'checkIn')
    const httpRequest = { 
      body: fakeShoppingCart() 
    } 
    await sut.handle(httpRequest) 
    expect(checkInSpy).toHaveBeenCalledWith(httpRequest.body) 
  })

  test('Should return 500 if ProductCheckIn throws', async () => { 
    const { sut, productCheckIn } = makeSut() 
    jest.spyOn(productCheckIn, 'checkIn').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error()))) 
    const httpRequest = { 
      body: fakeShoppingCart() 
    } 
    const httpResponse = await sut.handle(httpRequest) 
    expect(httpResponse.statusCode).toBe(500) 
    expect(httpResponse.body).toEqual(new Error()) 
  })

  test('Should call CreatePrePurchase with correct values', async () => { 
    const { sut, createPrePurchase } = makeSut() 
    const createSpy = jest.spyOn(createPrePurchase, 'create')
    const httpRequest = { 
      body: fakeShoppingCart() 
    } 
    await sut.handle(httpRequest) 
    expect(createSpy).toHaveBeenCalledWith(fakeProductCheckInData()) 
  })

  test('Should return 500 if CreatePrePurchase throws', async () => { 
    const { sut, createPrePurchase } = makeSut() 
    jest.spyOn(createPrePurchase, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error()))) 
    const httpRequest = { 
      body: fakeShoppingCart() 
    } 
    const httpResponse = await sut.handle(httpRequest) 
    expect(httpResponse.statusCode).toBe(500) 
    expect(httpResponse.body).toEqual(new Error()) 
  })
})