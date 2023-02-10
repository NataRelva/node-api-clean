import { LoadAccountByEmailRepository } from "../../protocols/load-account-by-email.repository"
import { AccountModel } from "../add-account/db-add-account.protocols"
import { DbAuthentication } from "./db-authentication"

describe('DbAuthentication UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
            async load(email: string): Promise<AccountModel> {
                const account: AccountModel = {
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    cpfCnpj: '',
                }
                return new Promise(resolver => resolver(account))
            }
        }
        const loadAccountByEmailRepository = new LoadAccountByEmailRepositoryStub()
        const sut = new DbAuthentication(loadAccountByEmailRepository)
        const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')
        await sut.auth({
            email: "email@email.com",
            password: "123456"
        })

        // Espero que seja chamado pelo metodo correto 
        expect(loadSpy).toHaveBeenLastCalledWith('email@email.com')
    })
})