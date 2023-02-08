import { MissingParamError } from "../../errors/missing-param.error"
import { EmailValidator } from "./login-protocols"
import { LoginController } from "./login"

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
})