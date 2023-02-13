import app from "../config/app"
import supertest from "supertest"
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper"
const request = supertest(app)

describe('Login Router', () => {

    beforeAll(async () => {
        if (!process.env.MONGO_URL) throw new Error('MongoDB server not initialized')
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.close()
    })

    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
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