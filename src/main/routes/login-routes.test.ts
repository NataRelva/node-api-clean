import { HttpRequest } from './../../presentation/protocols/http';
import app from "../config/app"
import supertest from "supertest"
import { Account } from '@prisma/client';

const makeAccount = (): Account => { 
    return {
        id: 'any_id',
        passwordResetToken: '',
        name: 'any_name',
        email: 'any_email@gmail.com',
        phone: '999929222',
        password: 'hunterxhunter',
        cpfCnpj: '11174235497',
        accessToken: 'any_token',
        passwordResetExpires: new Date(),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
    }
}

jest.mock('@prisma/client', () => { 
    return {
        PrismaClient: jest.fn().mockImplementation(() => {
            return {
                account: {
                    create: jest.fn().mockImplementation(() => makeAccount()),
                    findUnique: jest.fn().mockImplementation(() => makeAccount()),
                    update: jest.fn().mockImplementation(() => makeAccount()),
                    delete: jest.fn().mockImplementation(() => makeAccount()),
                    findFirst: jest.fn().mockImplementation(() => {
                        return { accessToken: 'any_token' }
                    })
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
            name: 'any_name',
            email: 'any_email@gmail.com',
            phone: '999929222',
            password: 'hunterxhunter',
            cpfCnpj: '88350281405',
            role: ''
        }
    }
}

describe('Login Router', () => {
    describe('POST /signup', () => {
        const request = supertest(app)
        test('Should return an account on signup', async () => {
            const response = await request
                .post('/api/signup')
                .send(makeRequest().body)

            expect(response.status).toBe(200)
            expect(response.body).toEqual({ accessToken: null })
        })

        test('Should return 400 if signup fails', async () => { 
            const response = await request
                .post('/api/signup')
                .send({
                    name: 'any_name',
                    email: 'any_email@gmail.com',
                    phone: '999929222',
                    password: 'hunterxhunter'
                })

            expect(response.status).toBe(400)
        })

        test('Should return 400 if request body is empty', async () => { 
            const response = await request
                .post('/api/signup')
                .send({})

            expect(response.status).toBe(400)
        })

        test('Should return 400 if request not fild cpfCnpj account ', async () => { 
            const response = await request
                .post('/api/signup')
                .send({
                    name: 'any_name',
                    email: 'any_email@gmail.com',
                    phone: '999929222',
                    password: 'hunterxhunter'
                })
            expect(response.status).toBe(400)
            expect(response.body).toEqual({ error: 'Invalid param: cpfCnpj' })
        })

        test('Should return 400 if request not fild name account ', async () => { 
            const response = await request
                .post('/api/signup')
                .send({
                    email: '',
                    phone: '999929222',
                    password: 'hunterxhunter',
                    cpfCnpj: '11174235497'
                })
            expect(response.status).toBe(400)
            expect(response.body).toEqual({ error: 'Missing param: name' })
        })

        test('Should return 400 if request not fild email account ', async () => { 
            const response = await request
                .post('/api/signup')
                .send({
                    name: 'any_name',
                    phone: '999929222',
                    password: 'hunterxhunter',
                    cpfCnpj: '11174235497'
                })
            expect(response.status).toBe(400)
            expect(response.body).toEqual({ error: 'Missing param: email' })
        })

        test('Should return 400 if request not fild phone account ', async () => { 
            const response = await request
                .post('/api/signup')
                .send({
                    name: 'any_name',
                    email: 'any_an@gmail.com',
                    password: 'hunterxhunter',
                    cpfCnpj: '11174235497'
                })
            expect(response.status).toBe(400)
            expect(response.body).toEqual({ error: 'Missing param: phone' })
        })
    })
})