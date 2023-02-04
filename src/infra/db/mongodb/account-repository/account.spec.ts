import mongoHelper from "../helpers/mongo-helper";
import { AccountMongoRepository } from "./account";

import dotenv from 'dotenv'
import path from "path";

dotenv.config({ path: path.join('.env') })
const mongoUri = process.env.MONGO_URI

if (mongoUri) {

    describe("Account Mongo Repository", () => {

        beforeAll(async () => {
            await mongoHelper.connect(mongoUri)
        })

        afterAll(async () => {
            await mongoHelper.close()
        })

        beforeEach(async () => {
            const accountCollection = await mongoHelper.getCollection('accounts')
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