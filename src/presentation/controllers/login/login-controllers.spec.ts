import { badRequest, serverError } from "./login-controllers-protocols"
import { LoginController } from "./login-controllers"

import { Authentication, AuthenticationModel } from "../../../domain/useCases/account/authentication"
import { Validation } from "../../helpers/validators/validations"

type SutTypesLogin = {
    validation: Validation,
    authentication: Authentication,
    sut: LoginController,
}

const makeValidator = (): Validation => {
    class ValidatorStub implements Validation {
        validate(input: any): Error | null {
            return null
        }
    }
    return new ValidatorStub()
}

const makeAuthentication = (): Authentication => {
    class AuthenticationStub implements Authentication {
        async auth(authentication: AuthenticationModel): Promise<string> {
            return new Promise(resolve => resolve('sou_pirata_solitário_sei_mais_nada'))
        }
    }

    return new AuthenticationStub()
}

const makeHttpRequest = (): any => {
    return {
        body: {
            email: "natan.danilo@gmail.com",
            password: "123456"
        }
    }
}

const makeFakeHttpResponse = (): any => {
    return {
        statusCode: 200,
        body: {
            accessToken: 'sou_pirata_solitário_sei_mais_nada'
        }
    }
}

const makeSut = (): SutTypesLogin => {
    const validation = makeValidator()
    const authentication = makeAuthentication()
    const sut = new LoginController(validation, authentication)
    return { validation, authentication, sut }
}

describe('Login Controller', () => {
    test('Should by return 200 if all ok', async () => {
        const { sut } = makeSut()
        const httpRequest = makeHttpRequest()
        const httpResponse = await sut.handle(httpRequest)
        const fakeHttpResponse = makeFakeHttpResponse()
        expect(httpResponse).toEqual(fakeHttpResponse)
    })

    test('Should by return 400 if email or password is not provided', async () => {
        const { sut, validation } = makeSut()
        jest.spyOn(validation, 'validate').mockReturnValueOnce(new Error())
        const httpRequest = makeHttpRequest()
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new Error()))
    })

    test('Should by return 500 if validation throws error', async () => {
        const { sut, validation } = makeSut();
        jest.spyOn(validation, 'validate').mockImplementationOnce(() => { throw new Error() })
        const httpRequest = makeHttpRequest()
        const response = await sut.handle(httpRequest)
        expect(response).toEqual(serverError(new Error()))
    })

})