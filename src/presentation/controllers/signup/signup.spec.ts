import { InvalidParamError, MissingParamError, ServerError } from '../../errors/index'
import { AccountModel, AddAccount, EmailValidator } from './signup-protocols'
import { SignupController } from './signup'
import { CpfCnpjValidator } from '../../protocols/cpf-cnpj-validator'
import { Validation } from '../../helpers/validators/validations'
import { badRequest } from '../login/login-protocols'

type SutTypes = {
  sut: SignupController,
  emailValidatorStub: EmailValidator,
  addAccountStub: AddAccount,
  validatorCpfCnpj: CpfCnpjValidator,
  validationStub: Validation
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

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub();
}

const makeCpfCnpjValidator = (): CpfCnpjValidator => {
  class CpfCnpjValidatorStub implements CpfCnpjValidator {
    isValid(cpfCnpj: string): boolean {
      return true;
    }
  }
  return new CpfCnpjValidatorStub();
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const validatorCpfCnpj = makeCpfCnpjValidator()
  const validationStub = makeValidation()
  const sut = new SignupController(emailValidatorStub, addAccountStub, validatorCpfCnpj, validationStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validatorCpfCnpj,
    validationStub
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

  test('Should return 400 if name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        // email: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('email'))
  });

  test('Should return 400 if password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_name',
        // password: 'any_password',
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if phone is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_name',
        password: 'any_password',
        // phone: 'any_phone',
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
  })

  test('Should return 400 if cpfCpnj is provided', async () => {
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

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new MissingParamError('cpfCnpj'))
  })

  test('Should return 400 if invalid email is provided', async () => {
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

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse?.statusCode).toBe(400)
    expect(httpResponse?.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', async () => {
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

    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should return 500 if invalid EmailValidar throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
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

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone',
      cpfCnpj: 'any_cpfCnpj'
    });

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
    expect(httpResponse?.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      phone: 'valid_phone',
      cpfCnpj: 'valid_cpfCnpj'
    })
  })

  test('Shuld return 200 cpf or cnpj when valid cpfCnjp', async () => {
    const { sut, validatorCpfCnpj } = makeSut()
    jest.spyOn(validatorCpfCnpj, 'isValid').mockReturnValueOnce(true)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: '11174235497'
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(200)
  })

  test('Shuld return 400 cpf or cnpj when invalid cpfCnjp', async () => {
    const { sut, validatorCpfCnpj } = makeSut()
    jest.spyOn(validatorCpfCnpj, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: '11174235497'
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400)
  })

  test('isValid in CpjCnpj validator return true when valid', async () => {
    const { sut, validatorCpfCnpj } = makeSut()
    const isValidCpjCnpj = jest.spyOn(validatorCpfCnpj, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        phone: 'any_phone',
        cpfCnpj: '11174235497'
      }
    }
    await sut.handle(httpRequest);
    expect(isValidCpjCnpj).toHaveReturnedWith(true)
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


})
