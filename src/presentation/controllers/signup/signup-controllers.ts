import { Controller, HttpRequest, HttpResponse, AddAccount } from './signup-controllers-protocols'
import { badRequest, serverError } from '../../helpers/http/http.helper'
import { ok } from '../../helpers/http/http.helper'
import { Validation } from '../../helpers/validators/validations'

export class SignupController implements Controller {
  private readonly addAccountStub: AddAccount
  private readonly validation: Validation

  constructor(
    addAccount: AddAccount,
    validation: Validation
  ) {
    this.addAccountStub = addAccount
    this.validation = validation
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const account = await this.addAccountStub.add(httpRequest.body)
      return ok(account)

    } catch (error) {
      return serverError()
    }

  }
}
