import { LoadAccountByEmailRepository } from "../../protocols/load-account-by-email.repository"
import { AccountModel } from "../add-account/db-add-account.protocols"
import { DbAuthentication } from "./db-authentication"

interface TypeSut {
    sut: DbAuthentication,
    loadAccountByEmailRepository: LoadAccountByEmailRepository
}

const makeFakeRequest = (): { email: string, password: string } => {
    return {
        email: 'email@email.com',
        password: 'password'
    }
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password',
    phone: 'valid_phone',
    cpfCnpj: 'valid_cpfCnpj',
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async load(email: string): Promise<AccountModel> {
            const account: AccountModel = makeFakeAccount()
            return new Promise(resolver => resolver(account))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): TypeSut => {
    const loadAccountByEmailRepository = makeLoadAccountByEmailRepository()
    const sut = new DbAuthentication(loadAccountByEmailRepository)
    return { sut, loadAccountByEmailRepository }
}

describe('DbAuthentication UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')
        await sut.auth(makeFakeRequest())
        // Espero que seja chamado pelo metodo correto 
        expect(loadSpy).toHaveBeenLastCalledWith('email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository ', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const response = sut.auth(makeFakeRequest())
        expect(response).rejects.toThrow()
    })
})