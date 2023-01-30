import { MissingParamError, InvalidParamError } from '../errors/index'
import { badRequest, serverError } from '../helpers/http.helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignupController implements Controller {

  private readonly emailValidator: EmailValidator
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
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

      return { 
        statusCode: 200,
        body: 'ok'
      }

    } catch (error) {
      return serverError()
    }
    
  }
}
