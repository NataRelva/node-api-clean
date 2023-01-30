import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors/index'
import { badRequest, serverError } from '../../helpers/http.helper'
import { ok } from '../../helpers/http.helper'

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

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email', 'password', 'phone', 'cpfCnpj']
    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
      
      if (!emailIsValid) return badRequest(new InvalidParamError('email'))
      
      const account = await this.addAccountStub.add(httpRequest.body)

      return ok(account)

    } catch (error) {
      return serverError()
    }
    
  }
}
