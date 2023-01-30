import { MissingParamError } from '../errors/missing-param.error';
import { SignupController } from './signup'

describe('Signup Controller', () => {
  test('Should return 400 if name is provided', () => {
    const sut = new SignupController()
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
    const sut = new SignupController()
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
    const sut = new SignupController()
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
    const sut = new SignupController()
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
    const sut = new SignupController()
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
})
