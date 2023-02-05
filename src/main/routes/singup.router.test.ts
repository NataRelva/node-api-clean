import app from "../config/app"
const supertest = require("supertest")
import MongoHelper from "../../infra/db/mongodb/helpers/mongo-helper"
const request = supertest(app)

describe('Singup Router', () => {

    beforeAll(async () => {
        if (!process.env.MONGO_URL) throw new Error('MongoDB server not initialized')
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.close()
    })

    beforeEach(async () => {
        const accountCollection = MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    test('Should return an account on succss', async () => {
        const account = {
            name: 'any_name',
            email: '',
            phone: '',
            password: '',
            cpfCnpj: '',
        }

        const response = await request
            .post('/api/singup')
            .send(account)

    })
})