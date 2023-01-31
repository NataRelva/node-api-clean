import { DbAddAccount } from "./db-add-account"

class EncrypterStub {
    async encrypt(value: string): Promise<string> {
        return new Promise(resolver => resolver('passwordHash'))
    }
}

type SutReturn = {
    sut: DbAddAccount,
    encrypterStub: EncrypterStub
}

const makeStub = (): EncrypterStub => {
    return new EncrypterStub()
}

const makeSut = (): SutReturn => {
    const encrypterStub = makeStub()
    const sut = new DbAddAccount(encrypterStub)
    return {
        sut,
        encrypterStub
    }
}

describe('DbAddAaccount Usecase', () => {
    test('Should call Encrypter with correct password', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'name',
            phone: '999888822',
            email: 'email',
            password: 'password',
            cpfCnpj: '11174235497'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('password')
    })

    test('Should throw if Encrypter throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolver, reject) => reject(new Error('Mock error'))))
        const accountData = {
            name: 'name',
            phone: '999888822',
            email: 'email',
            password: 'password',
            cpfCnpj: '11174235497'
        }
        const promise = sut.add(accountData)
        expect(promise).rejects.toThrow()
    })
})