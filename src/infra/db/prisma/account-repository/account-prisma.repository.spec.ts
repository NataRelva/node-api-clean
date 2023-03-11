import { PrismaHelper } from './../helpers/prisma-helper';
import { AccountPrismaRepository } from './account-prisma.repository';

interface AccountFake {
    name: string
    email: string
    phone: string
    cpfCnpj: string
    password: string
}

const prisma = PrismaHelper.getPrisma()

beforeEach(async () => {
    await prisma.account.deleteMany({
        where: {
            email: makeFakeAccountData().email
        }
    })
})

afterAll(async () => {
    await prisma.$disconnect()
})

const makeFakeAccountData = (): AccountFake => ({
    name: 'userName',
    email: 'userEmail@gmail.com',
    phone: '998822882',
    cpfCnpj: '1117423333',
    password: 'userPasswordHash',
})

describe("Account Prisma Repository", () => {
    test("Shoul return an account on success", async () => {
        const sut = new AccountPrismaRepository()
        const account = await sut.add(makeFakeAccountData())
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('userName')
    })

    test("Shoul return an account on loadByEmail success", async () => {
        const sut = new AccountPrismaRepository()
        await sut.add(makeFakeAccountData())
        const account = await sut.loadByEmail(makeFakeAccountData().email)
        expect(account).toBeTruthy()
        if (account) {
            expect(account.id).toBeTruthy()
        }
    })

    test("Shoul return null if loadByEmail fails", async () => {
        const sut = new AccountPrismaRepository()
        const account = await sut.loadByEmail(makeFakeAccountData().email)
        expect(account).toBeFalsy()
    })

    test("Shoul update the account accessToken on updateAccessToken success", async () => {
        const sut = new AccountPrismaRepository()
        const reponseAccount = await sut.add(makeFakeAccountData())
        await sut.updateAccessToken(reponseAccount.id, 'any_token')
        const account = await sut.findOne({ id: reponseAccount.id })
        expect(account).toBeTruthy()
        if (account) {
            expect(account.accessToken).toBe('any_token')
        }
    })

    test("Shoul return an account on loadByToken without role", async () => {
        const sut = new AccountPrismaRepository()
        const reponseAccount = await sut.add(makeFakeAccountData())
        await sut.updateAccessToken(reponseAccount.id, 'any_token')
        const account = await sut.loadByToken('any_token')
        expect(account).toBeTruthy()
        if (account) {
            expect(account.id).toBeTruthy()
        }
    })
});
