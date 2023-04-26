import { UpgradeOrCreateAddress } from "../../../../domain/useCases/account/upgrade-or-create-address.usecase";
import { MissingParamError } from "../../../errors";
import { Controller, HttpRequest, HttpResponse } from "../../../protocols";
import { badRequest, ok, serverError } from "../../login/login-controllers-protocols";

export class UpgradeOrCreateAddressController implements Controller {

  constructor(
    private readonly upgradeOrCreateAddress: UpgradeOrCreateAddress
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId, dataAddress } = request.body
      if (!accountId) return badRequest(new MissingParamError('accountId'))
      if (!dataAddress) return badRequest(new MissingParamError('dataAddress'))
      const address = await this.upgradeOrCreateAddress.upgradeOrCreate(accountId, dataAddress)
      return ok(address)
    } catch (error) {
      return serverError(error) 
    }
  }
}