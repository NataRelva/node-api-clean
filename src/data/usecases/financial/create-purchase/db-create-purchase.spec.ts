import { DataPurchaseEmail, PurchaseModel } from "../../../../domain/models/financial/purchase-entity"
import { SendPurchaseConfirmationEmail } from "../../../../services/protocols";
import { CreatePurchaseRepository } from "../../../protocols/db/financial/create-purchase-repository/create-purchase-repository"
import { DbCreatePurchase } from "./db-create-purchase"

const dataAtual = new Date();

const makeSendPurchaseConfirmationEmail = (): SendPurchaseConfirmationEmail => { 
  class SendPurchaseConfirmationEmailStub implements SendPurchaseConfirmationEmail { 
    async sendFromPurchaseConfirmation (data: DataPurchaseEmail ): Promise<boolean>{ 
      return true;
    } 
  } 
  return new SendPurchaseConfirmationEmailStub()
}

const mockPurchase = (): PurchaseModel => ({ 
  id: 'any_id',
  cart: {
    id: 'any_cart_id',
    account: {
      id: 'any_account_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      cpfCnpj: 'any_cpfCnpj',
      accessToken: 'any_accessToken'      
    },
    cartItem: [],
    total: 100
  },
  account: { 
    id: 'any_account_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      cpfCnpj: 'any_cpfCnpj',
      accessToken: 'any_accessToken' 
  },
  paymentMethod: 'any_paymentMethod',
  shippingAddress: 'any_shippingAddress',
  shippingPrice: 10,
  total: 110,
  status: 'pending',
  createDate: dataAtual,
  updateDate: dataAtual
})

const mockPurchaseParams = (): PurchaseModel => ({ 
  id: 'any_id',
  cart: {
    id: 'any_cart_id',
    account: {
      id: 'any_account_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      cpfCnpj: 'any_cpfCnpj',
      accessToken: 'any_accessToken'      
    },
    cartItem: [],
    total: 100
  },
  account: { 
    id: 'any_account_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      cpfCnpj: 'any_cpfCnpj',
      accessToken: 'any_accessToken' 
  },
  paymentMethod: 'any_paymentMethod',
  shippingAddress: 'any_shippingAddress',
  shippingPrice: 10,
  total: 110,
  status: 'pending',
  createDate: dataAtual,
  updateDate: dataAtual
})

const makeCreatePurchaseRepository = (): CreatePurchaseRepository => { 
  class CreatePurchaseRepositoryStub implements CreatePurchaseRepository { 
    async createPurchase(cartId: string): Promise<PurchaseModel> { 
      return Promise.resolve(mockPurchase()) 
    } 
  } 
  return new CreatePurchaseRepositoryStub() 
}

interface SutTypes { 
  sut: DbCreatePurchase,
  createPurchaseRepositoryStub: CreatePurchaseRepository,
  sendPurchaseConfirmationEmailStub: SendPurchaseConfirmationEmail
}

const makeSut = (): SutTypes => {
  const sendPurchaseConfirmationEmailStub = makeSendPurchaseConfirmationEmail()
  const createPurchaseRepositoryStub = makeCreatePurchaseRepository() 
  const sut = new DbCreatePurchase(createPurchaseRepositoryStub, sendPurchaseConfirmationEmailStub) 
  return { 
    sut, 
    createPurchaseRepositoryStub,
    sendPurchaseConfirmationEmailStub
  }
}

describe('DbCreatePurchase', () => { 
  test('Should call CreatePurchaseRepository with correct values', async () => { 
    const { sut, createPurchaseRepositoryStub } = makeSut() 
    const createPurchaseSpy = jest.spyOn(createPurchaseRepositoryStub, 'createPurchase') 
    await sut.execute('any_cart_id') 
    expect(createPurchaseSpy).toHaveBeenCalledWith('any_cart_id') 
  }) 
  test('Should throw if CreatePurchaseRepository throws', async () => { 
    const { sut, createPurchaseRepositoryStub } = makeSut() 
    jest.spyOn(createPurchaseRepositoryStub, 'createPurchase').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error()))) 
    const promise = sut.execute('any_cart_id') 
    await expect(promise).rejects.toThrow() 
  }) 
  test('Should return a Purchase on success', async () => { 
    const { sut } = makeSut() 
    const purchase = await sut.execute('any_cart_id') 
    expect(purchase).toEqual(mockPurchase()) 
  }) 
})