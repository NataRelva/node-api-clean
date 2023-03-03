import { AuthMiddleware } from './auth-middleware';
import { HttpRequest } from './../protocols/http';
import { forbidden } from "../helpers/http/http.helper"
import { AccessDeniedError } from "../errors"

interface SutTypes {
    sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
    const sut = new AuthMiddleware()
    return {
        sut
    }
}

const httpRequest = (): HttpRequest => {
    return {
        headers: {
            'x-access-token': 'any_token'
        }
    }
}

describe('Auth Middleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
})