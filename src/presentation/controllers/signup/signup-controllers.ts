import { Authentication } from './../../../domain/useCases/authentication';
import { ErrorHandler } from './../../protocols/error-handler';
import { Controller, HttpRequest, HttpResponse, AddAccount } from './signup-controllers-protocols'
import { badRequest } from '../../helpers/http/http.helper'
import { ok } from '../../helpers/http/http.helper'
import { Validation } from '../../helpers/validators/validations'

export class SignupController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  private readonly errorHandler: ErrorHandler
  private readonly authentication: Authentication

  constructor(
    addAccount: AddAccount,
    validation: Validation,
    errorHandler: ErrorHandler,
    authentication: Authentication,
  ) {
    this.addAccount = addAccount
    this.validation = validation
    this.errorHandler = errorHandler
    this.authentication = authentication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)
      await this.addAccount.add(httpRequest.body)
      const accessToken = await this.authentication.auth({ email: httpRequest.body.email, password: httpRequest.body.password })
      return ok({ accessToken })
    } catch (error) {
      return this.errorHandler.handle(error)
    }

  }
}
