import { PrismaHelper } from './../../infra/db/prisma/helpers/prisma-helper';
import app from "../config/app"
import supertest from "supertest"

const request = supertest(app)
const prisma = PrismaHelper.getPrisma()

describe('Login Router', () => {

    beforeAll(async () => {
        await PrismaHelper.connect()
    })

    afterAll(async () => {
        await PrismaHelper.disconnect()
    })

    beforeEach(async () => {
        await prisma.account.deleteMany({})
    })

    describe('POST /signup', () => {
        test('Should return an account on singup', async () => {
            const response = await request
                .post('/api/singup')
                .send({
                    name: 'any_name',
                    email: '',
                    phone: '',
                    password: '',
                    cpfCnpj: '',
                })

            // expect(response.status).toBe(200)
        })
    })
})