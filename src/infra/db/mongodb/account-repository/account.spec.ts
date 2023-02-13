import { MongoHelper } from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account";
import dotenv from 'dotenv'
import { Collection } from "mongodb";

dotenv.config()

const mongoUri = process.env.MONGO_URI

interface TypeSut {
    sut: AccountMongoRepository
}

const makeFakeAccountData = (): any => ({
    name: 'userName',
    email: 'userEmail@gmail.com',
    phone: '998822882',
    cpfCnpj: '1117423333',
    password: 'userPasswordHash',
})

const makeSut = (): TypeSut => {
    const sut = new AccountMongoRepository()
    return { sut }
}

if (!mongoUri) throw new Error('MONGO_URI not found')

if (mongoUri) {

    let accountCollection: Collection
    describe("Account Mongo Repository", () => {

        beforeAll(async () => {
            await MongoHelper.connect(mongoUri)
        })

        afterAll(async () => {
            await MongoHelper.close()
        })

        beforeEach(async () => {
            accountCollection = await MongoHelper.getCollection('accounts')
            await accountCollection.deleteMany({})
        })

        test('Shoul return an account on success', async () => {
            const sut = new AccountMongoRepository()
            const account = await sut.add(makeFakeAccountData())
            expect(account).toBeTruthy()
            expect(account.id).toBeTruthy()
            expect(account.name).toBe('userName')
            expect(account.email).toBe('userEmail@gmail.com')
            expect(account.phone).toBe('998822882')
            expect(account.cpfCnpj).toBe('1117423333')
            expect(account.password).toBe('userPasswordHash')
        })

        test('Shoul return an account on loadByEmail success', async () => {
            const { sut } = makeSut()
            await accountCollection.insertOne(makeFakeAccountData())
            const account = await sut.loadByEmail(makeFakeAccountData().email)
            expect(account).toBeTruthy()
            if (account) {
                expect(account.id).toBeTruthy()
            }
        })

        test('Shoul return null if loadByEmail fails', async () => {
            const { sut } = makeSut()
            const account = await sut.loadByEmail(makeFakeAccountData().email)
            expect(account).toBeFalsy()
        })

        test('Shoul update the account accessToken on updateAccessToken success', async () => {
            const { sut } = makeSut()
            const responseCollection = await accountCollection.insertOne(makeFakeAccountData())
            await sut.updateAccessToken(responseCollection.insertedId, 'any_token')
            const account = await accountCollection.findOne({ _id: responseCollection.insertedId })
            expect(account).toBeTruthy()
            if (account) {
                expect(account.accessToken).toBe('any_token')
            }
        })
    })
} else {
    throw new Error('MONGO_URI not found')
}