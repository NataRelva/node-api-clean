import { FinancialRepository } from './financial-repository';
import { Order } from './../../../../domain/models/logistics/order';
import { CartModel } from './../../../../domain/models/product/cart';
import { CreateCart } from './../../../../domain/useCases/logistics/create-cart/create-cart';
import { PrismaClient } from '@prisma/client';


jest.mock('@prisma/client', () => { 
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        product: {
          findUnique: jest.fn().mockImplementation(() => {
            return {
              price: 1
            }
          })
        }
      }
    })
  }
})

const makeFakeCart = (): CartModel => ({ 
  id: 'any_id',
  account: {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    phone: 'any_phone',
    cpfCnpj: 'any_cpfCnpj',
  },
  cartItem: [{
    id: 'any_id',
    product: {
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
    },
    quantity: 1
  }],
  total: 1
})

interface SutTypes { 
  sut: FinancialRepository,
}

const makeSut = (): SutTypes => { 
  const sut = new FinancialRepository(new PrismaClient())
  return {
    sut
  }
}

describe('FinancialRepository', () => { 
  describe('calculateOrderTotal', () => { 
    test('Should return the correct total', async () => {
      const { sut } = makeSut()
      const order = [
        {
          productId: 'any_product_id',
          quantity: 1
        }
      ]
      const total = await sut.calculateOrderTotal(order)
      expect(total).toBe(1)
    })
    test('Should return the correct total with more than one product', async () => { 
      const { sut } = makeSut()
      const order = [
        {
          productId: 'any_product_id',
          quantity: 1
        },
        {
          productId: 'any_product_id',
          quantity: 1
        }
      ]
      const total = await sut.calculateOrderTotal(order)
      expect(total).toBe(2)
    })
    test('Should return the correct total with more than one product and different quantities', async () => { 
      const { sut } = makeSut()
      const order = [
        {
          productId: 'any_product_id',
          quantity: 1
        },
        {
          productId: 'any_product_id',
          quantity: 2
        }
      ]
      const total = await sut.calculateOrderTotal(order)
      expect(total).toBe(3)
    })
  })
})