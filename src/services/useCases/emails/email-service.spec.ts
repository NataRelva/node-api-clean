import sendGrid from "@sendgrid/mail"
import { EmailService } from "./email-service"
import { DataPurchaseEmail, PurchaseModel } from "../../../domain/models/financial/purchase-entity"

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
        ...mockPurchase()
      }
    })
  })
  test('Should return true if send succeeds', async () => { 
    const { sut } = makeSut()
    const result = await sut.sendFromPurchaseConfirmation(mockPurchase())
    expect(result).toBe(true)
  })
})

const mockPurchase = (): DataPurchaseEmail => ({ 
  user_email: 'any_email',
  user_name: 'any_name',
  user_phone: 'any_phone',
  cpfCnpj: 'any_cpfCnpj',
  address_user: 'any_address_user',
  Sender_Name: 'any_Sender_Name',
  Sender_Address: 'any_Sender_Address',
  Sender_State: 'any_Sender_State',
  Sender_City: 'any_Sender_City',
  Sender_Zip: 'any_Sender_Zip',
  date: {
    mm: 'any_mm',
    dd: 'any_dd',
    yy: 'any_yy'
  },
  id: 'any_id',
  purchase_id: 'any_purchase_id',
  total: 'any_total',
  products: {
    data: [{
      product_name: 'any_product_name',
      quantity: 'any_quantity',
      sub_total: 1
    }]
  }
})


const makeSut = () => { 
  const sut = new EmailService()
  return {sut}
}