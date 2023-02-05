import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.MONGO_URI

if (!uri) throw new Error('MONGO_URI not found in env')

describe('Log Mongo Repository', () => {
    let collection: Collection
    beforeAll(async () => {
        await MongoHelper.connect(uri)
    })

    afterAll(async () => {
        await MongoHelper.close()
    })

    beforeEach(async () => {
        collection = await MongoHelper.getCollection('errors')
        await collection.deleteMany({})
    })

    test('Should create an error log on success', async () => {
        const sut = new LogMongoRepository()
        await sut.logError('any_error')
        const count = await collection.countDocuments()
        expect(count).toBe(1)
    })
})