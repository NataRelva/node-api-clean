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
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
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
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  });
})
