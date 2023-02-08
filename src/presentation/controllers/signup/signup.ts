import { Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount } from './signup-protocols'
import { InvalidParamError } from '../../errors/index'
import { badRequest, serverError } from '../../helpers/http.helper'
import { ok } from '../../helpers/http.helper'
import { CpfCnpjValidator } from '../../protocols/cpf-cnpj-validator'
import { Validation } from '../../helpers/validators/validations'

export class SignupController implements Controller {

  private readonly emailValidator: EmailValidator
  private readonly addAccountStub: AddAccount
  private readonly cpfCnpjValidator: CpfCnpjValidator
  private readonly validationStub: Validation

  constructor(
    emailValidator: EmailValidator,
    addAccount: AddAccount,
    cpfCnpjValidator: CpfCnpjValidator,
    validationStub: Validation
  ) {
    this.emailValidator = emailValidator
    this.addAccountStub = addAccount
    this.cpfCnpjValidator = cpfCnpjValidator
    this.validationStub = validationStub
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validationStub.validate(httpRequest.body)
      if (error) return badRequest(error)

      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!emailIsValid) return badRequest(new InvalidParamError('email'))

      const cpfOrCpnjIsValid = this.cpfCnpjValidator.isValid(httpRequest.body.cpfCnpj)
      if (!cpfOrCpnjIsValid) return badRequest(new InvalidParamError('cpjCpnj'))

      const account = await this.addAccountStub.add(httpRequest.body)
      return ok(account)

    } catch (error) {
      return serverError()
    }

  }
}
