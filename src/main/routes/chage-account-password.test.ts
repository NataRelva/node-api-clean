import { HttpRequest } from './../../presentation/protocols/http';
import { Account } from '@prisma/client';
import supertest from "supertest"
import app from "../config/app"

const makeAccount = (): Account => { 
  return {
      id: 'any_id',
      passwordResetToken: 'any_token',
      name: 'any_name',
      email: 'any_email@gmail.com',
      phone: '999929222',
      password: 'hunterxhunter',
      cpfCnpj: '11174235497',
      accessToken: 'any_token',
      passwordResetExpires: new Date( new Date().getTime() + (1000 * 60 * 60 * 24)),
      role: '',
      createdAt: new Date(),
      updatedAt: new Date()
  }
}

jest.mock('jsonwebtoken', ()=> {
  return {
    sign: jest.fn().mockReturnValue('any_token'),
    verify: jest.fn().mockReturnValue('any_token')
  }
})

jest.mock('bcrypt', ()=> {
  return {
    hash: jest.fn().mockReturnValue('any_token'),
    compare: jest.fn().mockReturnValue(true)
  }
})

jest.mock('@prisma/client', () => { 
  return {
      PrismaClient: jest.fn().mockImplementation(() => {
          return {
              account: {
                create: jest.fn().mockImplementation(() => makeAccount()),
                findUnique: jest.fn().mockImplementation(() => makeAccount()),
                update: jest.fn().mockImplementation(() => makeAccount()),
                delete: jest.fn().mockImplementation(() => makeAccount()),
                findFirst: jest.fn().mockImplementation(() => makeAccount())
              }
          }
      })
  }
})


const makeRequest = (): HttpRequest => { 
  return {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'any_token'
      },
      body: {
        "password": "labraxurias",
	      "email": "natan.danilo@gmail.com"
      }
  }
}

describe('Change Account Password Router', () => {
  beforeEach(async () => { 
    jest.clearAllMocks()
  })

  test('Should return 200 on change account password', async () => {
    const request = supertest(app).post('/api/change-account-password')
    const response = await request.send(makeRequest().body).set(makeRequest().headers)
    expect(response.status).toBe(200)
    expect(response.body).toEqual('Senha alterada com sucesso!')
  })

  test('Should return 400 if no password is provided', async () => {
    const request = supertest(app).post('/api/change-account-password')
    const response = await request.send({email: makeAccount().email}).set(makeRequest().headers)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({"error": "Senha não informada!"})
  })

  test('Should return 400 if no email is provided', async () => { 
    const request = supertest(app).post('/api/change-account-password')
    const response = await request.send({password: makeAccount().password}).set(makeRequest().headers)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({"error": "Email não informado!"})
  })
})