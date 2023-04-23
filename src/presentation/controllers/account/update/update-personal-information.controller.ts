import { UpdatePersonalInformation } from "../../../../domain/useCases/account/update-personal-information.usecase";
import { MissingParamError } from "../../../errors";
import { Controller, HttpRequest, HttpResponse } from "../../../protocols";
import { badRequest, ok, serverError } from "../../login/login-controllers-protocols";

export class UpdatePersonalInformationController implements Controller {
  constructor(
    private readonly updatePersonalInformation: UpdatePersonalInformation
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {

      const { accountId, name, email, phone } = request.body
      if (!accountId) {
        return badRequest(new MissingParamError('accountId'))
      } else if (!name) { 
        return badRequest(new MissingParamError('name'))
      } else if (!email) { 
        return badRequest(new MissingParamError('email'))
      } else if (!phone) { 
        return badRequest(new MissingParamError('phone'))
      } 

      const updatedAccount = await this.updatePersonalInformation.execute({
        accountId,
        name,
        email,
        phone
      })
      return ok(updatedAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}