import { DbAddAccount } from "./db-add-account"
import { AccountModel, AddAccountModel, Encrypter, AddAccountRepository } from "./db-add-account.protocols"

class EncrypterStub {
    async encrypt(value: string): Promise<string> {
        return new Promise(resolver => resolver('passwordHash'))
    }
}

class AddAccountRepositoryStub implements AddAccountRepository {
    async add(value: AddAccountModel): Promise<AccountModel> {
        return new Promise(resolve => resolve({
            cpfCnpj: '',
            email: '',
            id: '',
            name: '',
            password: '',
            phone: '',
        }))
    }
}

type SutReturn = {
    sut: DbAddAccount,
    encrypterStub: EncrypterStub,
    addAccountRepositoryStub: AddAccountRepository
}

const makeStub = (): EncrypterStub => {
    return new EncrypterStub()
}

const makeStubAddAccountRepositoryStub = (): AddAccountRepositoryStub => {
    return new AddAccountRepositoryStub()
}

const makeEncrypter = () => {
    class EncrypterStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }

    return new EncrypterStub()
}

const makeSut = (): SutReturn => {
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeStubAddAccountRepositoryStub()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
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

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        const accountData = {
            name: 'name',
            phone: '999888822',
            email: 'email',
            password: 'password',
            cpfCnpj: '11174235497'
        }
        await sut.add(accountData)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'name',
            phone: '999888822',
            email: 'email',
            password: 'hashed_password',
            cpfCnpj: '11174235497'
        })
    })

    test('Should throw if AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolver, reject) => reject(new Error('Mock error'))))
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

    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const accountData = {
            name: 'name',
            phone: '999888822',
            email: 'email',
            password: 'password',
            cpfCnpj: '11174235497'
        }
        const account = await sut.add(accountData)
        expect(account).toEqual({
            id: '',
            name: '',
            phone: '',
            email: '',
            password: '',
            cpfCnpj: ''
        })
    })
})