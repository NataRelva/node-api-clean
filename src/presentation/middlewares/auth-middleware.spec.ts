import { AccountModel } from './../../domain/models/account';
import { LoadAccountByToken } from './../../domain/useCases/load-account-by-token';
import { AuthMiddleware } from './auth-middleware';
import { HttpRequest } from './../protocols/http';
import { forbidden } from "../helpers/http/http.helper"
import { AccessDeniedError } from "../errors"

interface SutTypes {
    sut: AuthMiddleware,
    loadAccountByTokenStup: LoadAccountByToken
}

const makeSut = (): SutTypes => {
    const loadAccountByTokenStup = makeLoadAccountByTokenStup()
    const sut = new AuthMiddleware(loadAccountByTokenStup)
    return {
        sut,
        loadAccountByTokenStup
    }
}

const httpRequest = (): HttpRequest => {
    return {
        headers: {
            'x-access-token': 'any_token'
        }
    }
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: '',
    password: '',
    phone: '',
    cpfCnpj: '',
})

const makeLoadAccountByTokenStup = (): LoadAccountByToken => {
    class LoadAccountByTokenStup implements LoadAccountByToken {
        async load(accessToken: string, role?: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    return new LoadAccountByTokenStup()
}

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct accessToken', async () => {
        const { sut, loadAccountByTokenStup } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByTokenStup, 'load')
        await sut.handle(httpRequest())
        expect(loadSpy).toHaveBeenCalledWith('any_token')
    })

    test('Should return Account if LoadAccountByToken succeeds', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(httpRequest())
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: makeFakeAccount()
        })
    })
})