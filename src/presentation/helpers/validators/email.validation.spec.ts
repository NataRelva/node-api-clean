import { AccountModel, AddAccount, EmailValidator } from '../../controllers/signup/signup-protocols'
import { badRequest } from '../../controllers/login/login-protocols'
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


describe('Email Validation', () => {

  test('Should return 500 if invalid EmailValidar throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
  })

})
