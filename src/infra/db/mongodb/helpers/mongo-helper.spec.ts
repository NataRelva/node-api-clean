import { MongoHelper } from "./mongo-helper";
import dotenv from 'dotenv'
dotenv.config()

const mongoUri = process.env.MONGO_URI

if (!mongoUri) throw new Error('ENV MONGO_URI not found')

describe('MongoHelper', () => {

    beforeAll(async () => {
        await MongoHelper.connect(mongoUri)
    })

    afterAll(async () => {
        await MongoHelper.close()
    })

    test('Should reconnect if mongodb is down', async () => {
        const sut = await MongoHelper.getCollection('accounts')
        expect(sut).toBeTruthy()
    });
})