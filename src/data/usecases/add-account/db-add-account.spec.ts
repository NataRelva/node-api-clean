import { CheckRegistration } from './../../../presentation/protocols/check-registration';
import { DbAddAccount } from "./db-add-account"
import { AccountModel, AddAccountModel, Hasher, AddAccountRepository } from "./db-add-account.protocols"

class EncrypterStub {
    async hash(value: string): Promise<string> {
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
    addAccountRepositoryStub: AddAccountRepository,
    checkRegistration: CheckRegistration
}

const makeStub = (): EncrypterStub => {
    return new EncrypterStub()
}

const makeStubAddAccountRepositoryStub = (): AddAccountRepositoryStub => {
    return new AddAccountRepositoryStub()
}

const makeEncrypter = () => {
    class EncrypterStub implements Hasher {
        async hash(value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }

    return new EncrypterStub()
}

const makeCheckRegistration = () => {
    class CheckRegistrationStub implements CheckRegistration {
        async check(cpfCnpj: string, email: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }

    return new CheckRegistrationStub()
}

const makeSut = (): SutReturn => {
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeStubAddAccountRepositoryStub()
    const checkRegistration = makeCheckRegistration()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub, checkRegistration)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub,
        checkRegistration
    }
}

describe('DbAddAaccount Usecase', () => {
    test('Should call Hasher with correct password', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'hash')
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

    test('Should throw if Hasher throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'hash').mockReturnValueOnce(new Promise((resolver, reject) => reject(new Error('Mock error'))))
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

    test('Should call CheckRegistration with correct values', async () => {
        const { sut, checkRegistration } = makeSut()
        const checkSpy = jest.spyOn(checkRegistration, 'check')
        const accountData = {
            name: 'name',
            phone: '999888822',
            email: 'email',
            password: 'password',
            cpfCnpj: '11174235497'
        }
        await sut.add(accountData)
        expect(checkSpy).toHaveBeenCalledWith('11174235497', 'email')
    })

    test('Should throw if CheckRegistration throws', async () => {
        const { sut, checkRegistration } = makeSut()
        jest.spyOn(checkRegistration, 'check').mockReturnValueOnce(new Promise((resolver, reject) => reject(new Error('Mock error'))))
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