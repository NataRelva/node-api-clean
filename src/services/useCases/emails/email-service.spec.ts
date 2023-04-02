import sendGrid from "@sendgrid/mail"
import { EmailService } from "./email-service"
import { PurchaseModel } from "../../../domain/models/financial/purchase-entity"

import env from '../../../main/config/env'

const dataAtual = new Date()

jest.mock('@sendgrid/mail', () => ({ 
  setApiKey: jest.fn(),
  send: jest.fn()
}))

describe('EmailService', () => {
  test('Should call setApiKey with correct value', () => { 
    const { sut } = makeSut()
    sut.sendFromPurchaseConfirmation(mockPurchase())
    expect(sendGrid.setApiKey).toHaveBeenCalledWith(env.sendGridKey)
  })
  test('Should call send with correct values', () => { 
    const { sut } = makeSut()
    sut.sendFromPurchaseConfirmation(mockPurchase())
    expect(sendGrid.send).toHaveBeenCalledWith({
      to: 'any_email',
      from: env.emailFrom,
      subject: 'Confirmação de compra',
      templateId: env.templateIdPurchaseConfirmation,
      dynamicTemplateData: { 
        purchaseData: mockPurchase()
      }
    })
  })
  test('Should return true if send succeeds', async () => { 
    const { sut } = makeSut()
    const result = await sut.sendFromPurchaseConfirmation(mockPurchase())
    expect(result).toBe(true)
  })
})

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


const makeSut = () => { 
  const sut = new EmailService()
  return {sut}
}