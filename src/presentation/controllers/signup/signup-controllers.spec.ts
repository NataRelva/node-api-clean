import { Authentication, AuthenticationModel } from './../../../domain/useCases/authentication';
import { ErrorHandler } from './../../protocols/error-handler';
import { InvalidParamError, ServerError } from '../../errors/index'
import { AccountModel, AddAccount } from './signup-controllers-protocols'
import { SignupController } from './signup-controllers'
import { Validation } from '../../helpers/validators/validations'
import { badRequest } from '../login/login-controllers-protocols'

type SutTypes = {
  sut: SignupController,
  validationStub: Validation,
  addAccountStub: AddAccount,
  authentication: Authentication
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
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      cpfCnpj: '11174235497'
    }
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

const makeErrorHandler = (): ErrorHandler => {
  class ErrorHandlerStub implements ErrorHandler {
    handle(error: Error): any {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
  return new ErrorHandlerStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const errorHandler = makeErrorHandler()
  const authentication = makeAuthentication()
  const sut = new SignupController(addAccountStub, validationStub, errorHandler, authentication)
  return {
    sut,
    validationStub,
    addAccountStub,
    authentication
  }
}

const makeAddAccount = () => {
  class AddAccountStub implements AddAccount {
    async add(account: AccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        phone: 'valid_phone',
        cpfCnpj: 'valid_cpfCnpj',
        password: 'valid_password'
      }
      return new Promise(resolver => resolver(fakeAccount))
    }
  }
  return new AddAccountStub()
}


describe('Signup Controller', () => {

  test('Should call AddAccount with corrent values', async () => {
    const { sut, validationStub } = makeSut()
  })

  test('Should return 500 if invalid add account throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: 'any_cpfCnpj'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(500)
    expect(httpResponse?.body).toEqual(new ServerError())
  })

  test('Should call AddAccount with corrent values', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: 'any_cpfCnpj'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(200)
    expect(httpResponse?.body).toEqual({ accessToken: "sou_pirata_solitário_sei_mais_nada" })
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest);
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Shuld return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeHttpRequest()
    const response = await sut.handle(httpRequest);
    expect(response).toEqual(badRequest(new Error()))
  })

  test('Should return 400 if an invalid email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: 'any_cpfCnpj'
      }
    }
    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolver => resolver(badRequest(new InvalidParamError('email')))))
    const response = await sut.handle(httpRequest)
    expect(sut.handle).toHaveBeenCalledWith(httpRequest)
    expect(response).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should return 400 if an invalid cpfCnpj is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: 'invalid_cpfCnpj'
      }
    }
    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolver => resolver(badRequest(new InvalidParamError('cpfCnpj')))))
    const response = await sut.handle(httpRequest)
    expect(sut.handle).toHaveBeenCalledWith(httpRequest)
    expect(response).toEqual(badRequest(new InvalidParamError('cpfCnpj')))
  })

  test('Should return 400 if an invalid password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'invalid_password',
        phone: 'any_phone',
        cpfCnpj: 'any_cpfCnpj'
      }
    }
    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolver => resolver(badRequest(new InvalidParamError('password')))))
    const response = await sut.handle(httpRequest)
    expect(sut.handle).toHaveBeenCalledWith(httpRequest)
    expect(response).toEqual(badRequest(new InvalidParamError('password')))
  })

})
