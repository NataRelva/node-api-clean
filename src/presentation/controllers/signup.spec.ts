import { InvalidParamError } from '../errors/invalid-param.error';
import { MissingParamError } from '../errors/missing-param.error';
import { EmailValidator } from '../protocols/email-validator';
import { SignupController } from './signup'

type SutTypes = { 
  sut: SignupController,
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignupController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
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
})
