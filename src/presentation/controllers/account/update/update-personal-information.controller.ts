import { ChangeAccountPassword } from "../../../../domain/useCases/account/change-account-password";
import { UpdateEmail } from "../../../../domain/useCases/account/update-email.usecase";
import { UpdatePersonalInformation } from "../../../../domain/useCases/account/update-personal-information.usecase";
import { MissingParamError } from "../../../errors";
import { Validation } from "../../../helpers/validators";
import { Controller, HttpRequest, HttpResponse } from "../../../protocols";
import { Authentication, badRequest, ok, serverError, unauthorized } from "../../login/login-controllers-protocols";

export class UpdatePersonalInformationController implements Controller {
  constructor(
    private readonly updatePersonalInformation: UpdatePersonalInformation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {

      const { accountId, name, cpfCnpj, phone } = request.body
      console.log('request.body', request.body)
      if (!accountId) {
        return badRequest(new MissingParamError('accountId'))
      } else if (!name) { 
        return badRequest(new MissingParamError('name'))
      } else if (!cpfCnpj) { 
        return badRequest(new MissingParamError('cpfCnpj'))
      } else if (!phone) { 
        return badRequest(new MissingParamError('phone'))
      } 

      const updatedAccount = await this.updatePersonalInformation.execute({
        accountId,
        name,
        cpfCnpj,
        phone
      })
      return ok(updatedAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class UpdatePersonalLoginController implements Controller {
  constructor(
    private readonly changeAccountPassword: ChangeAccountPassword,
    private readonly updateEmail: UpdateEmail,
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
        const { email, password } = httpRequest.body
        const account = await this.updateEmail.execute({ 
          accountId: httpRequest.body.accountId,
          email
        })
        console.log('account', account)
        if (!password) return badRequest(new MissingParamError('password'));
        await this.changeAccountPassword.change(account.accessToken, account.email, password, 'profile');
        return ok(account)
    } catch (error) {
        return serverError(error);
    }
  }
}