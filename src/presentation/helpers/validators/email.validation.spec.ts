import { AccountModel, AddAccount, EmailValidator } from '../../controllers/signup/signup-controllers-protocols'
import { badRequest } from '../../controllers/login/login-controllers-protocols'
import { EmailValidation } from './email.validation'

type SutTypes = {
  sut: EmailValidation,
  emailValidatorStub: EmailValidator,
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
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub,
  }
}

describe('Email Validation', () => {

  test('Should return 500 if invalid EmailValidar throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
  })

})
