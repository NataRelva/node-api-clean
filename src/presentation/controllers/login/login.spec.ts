import { MissingParamError } from "../../errors/missing-param.error"
import { EmailValidator } from "./login-protocols"
import { LoginController } from "./login"
import { badRequest, serverError } from "../../helpers/http.helper"
import { InvalidParamError } from "../../errors/invalid-param.error"

type SutTypes = {
    sut: LoginController,
    emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const sut = new LoginController(emailValidatorStub)
    return {
        sut,
        emailValidatorStub
    }
}

describe('Login Controller', () => {
    test('Should by return 400 if email is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: "",
                password: "123456"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
    })

    test('Should by return 400 if password is not provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                email: "natan@gmail.com",
                password: ""
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
    })

    test('Should call email validator with correct email', async () => {
        const { sut, emailValidatorStub } = makeSut()
        const emailValid = jest.spyOn(emailValidatorStub, 'isValid')
        const httpRequest = {
            body: {
                email: "nata@gmail.com",
                password: "hunterxhunter"
            }
        }
        await sut.handle(httpRequest)
        expect(emailValid).toHaveBeenCalledWith(httpRequest.body.email)
    })

    test('Should by return 400 if email is not provided', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
        const httpRequest = {
            body: {
                email: "natan@gmail.com",
                password: "hunterxhunter"
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })

    test('Should by return 500 if email validator throws', async () => {
        const { sut, emailValidatorStub } = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error()
        });

        const httpRequest = {
            body: {
                email: "natan@gmail.com",
                password: "hunterxhunter"
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(serverError())
    })
})