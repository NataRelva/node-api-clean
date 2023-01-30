import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors/index'
import { badRequest, serverError } from '../../helpers/http.helper'

export class SignupController implements Controller {

  private readonly emailValidator: EmailValidator
  private readonly addAccountStub: AddAccount
  constructor(
    emailValidator: EmailValidator,
    addAccount: AddAccount
  ) {
    this.emailValidator = emailValidator
    this.addAccountStub = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'phone', 'cpfCnpj']

    try {

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
  
      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!emailIsValid) { 
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccountStub.add(httpRequest.body)

      return { 
        statusCode: 200,
        body: 'ok'
      }

    } catch (error) {
      return serverError()
    }
    
  }
}
