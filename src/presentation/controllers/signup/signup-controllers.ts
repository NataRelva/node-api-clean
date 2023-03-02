import { ErrorHandler } from './../../protocols/error-handler';
import { Controller, HttpRequest, HttpResponse, AddAccount } from './signup-controllers-protocols'
import { badRequest } from '../../helpers/http/http.helper'
import { ok } from '../../helpers/http/http.helper'
import { Validation } from '../../helpers/validators/validations'

export class SignupController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  private readonly errorHandler: ErrorHandler

  constructor(
    addAccount: AddAccount,
    validation: Validation,
    errorHandler: ErrorHandler
  ) {
    this.addAccount = addAccount
    this.validation = validation
    this.errorHandler = errorHandler
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const account = await this.addAccount.add(httpRequest.body)
      return ok(account)

    } catch (error) {
      return this.errorHandler.handle(error)
    }

  }
}
