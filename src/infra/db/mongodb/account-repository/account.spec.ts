import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account";
import dotenv from 'dotenv'

dotenv.config()

const mongoUri = process.env.MONGO_URI

if (!mongoUri) throw new Error('MONGO_URI not found')

if (mongoUri) {

    describe("Account Mongo Repository", () => {

        beforeAll(async () => {
            await MongoHelper.connect(mongoUri)
        })

        afterAll(async () => {
            await MongoHelper.close()
        })

        beforeEach(async () => {
            const accountCollection = await MongoHelper.getCollection('accounts')
            await accountCollection.deleteMany({})
        })

        test('Shoul return an account on success', async () => {
            const sut = new AccountMongoRepository()
            const account = await sut.add({
                name: 'userName',
                email: 'userEmail@gmail.com',
                phone: '998822882',
                cpfCnpj: '1117423333',
                password: 'userPasswordHash',
            })
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('userName')
            expect(account.email).toBe('userEmail@gmail.com')
            expect(account.phone).toBe('998822882')
            expect(account.cpfCnpj).toBe('1117423333')
            expect(account.password).toBe('userPasswordHash')
        })
    })
} else {
    throw new Error('MONGO_URI not found')
}