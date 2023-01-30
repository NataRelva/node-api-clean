import { InvalidParamError, MissingParamError,ServerError  } from '../../errors/index'
import {AccountModel, AddAccount, EmailValidator} from './signup-protocols'
import { SignupController } from './signup'

type SutTypes = { 
  sut: SignupController,
  emailValidatorStub: EmailValidator,
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => { 
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub();
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignupController(emailValidatorStub,addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

const makeAddAccount = () => { 
  class AddAccountStub implements AddAccount {
    add(account: AccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        phone: 'valid_phone',
        cpfCnpj: 'valid_cpfCnpj',
        password: 'valid_password'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      throw new Error()
    }
  }
  return new EmailValidatorStub();
}

describe('Signup Controller', () => {
  test('Should return 400 if name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        // email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('email'))
  });

  test('Should return 400 if password is provided', () => { 
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_name',
        // password: 'any_password',
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if phone is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: { 
        name: 'any_name',
        email: 'any_name',
        password: 'any_password',
        // phone: 'any_phone',
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
  })

  test('Should return 400 if cpfCpnj is provided', ()=> {
    const { sut } = makeSut()
    const httpRequest = {
      body: { 
        name: 'any_name',
        email: 'any_name',
        password: 'any_password',
        phone: 'any_phone',
        // cpfCnpj: 'any_cpfCnpj'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('cpfCnpj'))
  })

  test('Should return 400 if invalid email is provided', ()=> {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: { 
        name: 'any_name',
        email: 'invalid_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: 'any_cpfCnpj'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', ()=> {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: { 
        name: 'any_name',
        email: 'valid_email@email.com',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: 'any_cpfCnpj'
      }
    }

    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should return 500 if invalid EmailValidar throws', ()=> {
    const emailValidatorStub = makeEmailValidatorWithError()
    const sut = new SignupController(emailValidatorStub, makeAddAccount())
    const httpRequest = {
      body: { 
        name: 'any_name',
        email: 'invalid_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: 'any_cpfCnpj'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(500)
    expect(httpResponse?.body).toEqual(new ServerError())
  })

  test('Should call AddAccount with corrent values', ()=> {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: 'any_cpfCnpj'
      }
    }

    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      cpfCnpj: 'any_cpfCnpj'
    });

  })

})
