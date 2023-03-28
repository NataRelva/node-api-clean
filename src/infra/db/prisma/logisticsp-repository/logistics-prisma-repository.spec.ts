import { prisma } from './../helpers/prisma-helper';
import { PrismaClient } from '@prisma/client';
import { LogisticsPrismaRepository } from './logistics-prisma-repository';

interface SutTypes { 
  sut: LogisticsPrismaRepository,
  prisma: PrismaClient
}

jest.mock('@prisma/client', () => { 
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        product: {
          findUnique: jest.fn().mockImplementation(() => {
            return {
              id: 'any_id',
              name: 'any_name',
              description: 'any_description',
              price: 1,
              category: {
                id: 'any_id',
                name: 'any_name',
                description: 'any_description',
                mainCategory: {
                  id: 'any_id',
                  name: 'any_name',
                  description: 'any_description',
                },
                subCategory: {
                  id: 'any_id',
                  name: 'any_name',
                  description: 'any_description',
                }
              },
              package: {
                id: 'any_id',
                name: 'any_name',
                description: 'any_description',
                unit: {
                  id: 'any_id',
                  name: 'any_name',
                  description: 'any_description',
                }
              }
            }
          })
        }
      }
    })
  }
})

const makeSut = (): SutTypes => {
  const prisma = new PrismaClient();
  const sut = new LogisticsPrismaRepository(prisma);
  return {
    sut,
    prisma
  };
}

describe('LogisticsPrismaRepository', () => {
  describe('loadProductsByIds', () => {
    test('Should return an array of products', async () => {
      const { sut } = makeSut();
      const products = await sut.loadProductsByIds([{ id: 'any_id', quantity: 1, discount: 0 }]);
      expect(products).toEqual([{
        product: {
          id: 'any_id',
          name: 'any_name',
          description: 'any_description',
          price: 1,
          category: {
            id: 'any_id',
            name: 'any_name',
            description: 'any_description',
            mainCategory: {
              id: 'any_id',
              name: 'any_name',
              description: 'any_description',
            },
            subCategory: {
              id: 'any_id',
              name: 'any_name',
              description: 'any_description',
            }
          },
          package: {
            id: 'any_id',
            name: 'any_name',
            description: 'any_description',
            unit: {
              id: 'any_id',
              name: 'any_name',
              description: 'any_description',
            }
          }
        },
        quantity: 1,
        discount: 0
      }]);
    });
    test('Should return an empty array', async () => { 
      const { sut } = makeSut();
      const products = await sut.loadProductsByIds([]);
      expect(products).toEqual([]);
    })
    test('Should throw if PrismaClient throws', async () => { 
      const { sut, prisma } = makeSut();
      jest.spyOn(prisma.product, 'findUnique').mockImplementationOnce(() => { 
        throw new Error();
      })
      const promise = sut.loadProductsByIds([{ id: 'any_id', quantity: 1, discount: 0}]);
      await expect(promise).rejects.toThrow();
    })
  })
})

const fakeReponseProducts = [{
  product: {
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    price: 1,
    category: {
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      mainCategory: {
        id: 'any_id',
        name: 'any_name',
        description: 'any_description',
      },
      subCategory: {
        id: 'any_id',
        name: 'any_name',
        description: 'any_description',
      }
    },
    package: {
      id: 'any_id',
      name: 'any_name',
      description: 'any_description',
      unit: {
        id: 'any_id',
        name: 'any_name',
        description: 'any_description',
      }
    }
  },
  quantity: 1
}]