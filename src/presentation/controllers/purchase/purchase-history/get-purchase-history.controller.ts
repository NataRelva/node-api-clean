import { GetPurchaseHistory } from "../../../../domain/useCases/financial/purchase/get-purchase-history.usecase";
import { MissingParamError } from "../../../errors";
import { Controller, HttpRequest, HttpResponse } from "../../../protocols";
import { badRequest, ok, serverError } from "../../login/login-controllers-protocols";

export class GetPurchaseHistoryController implements Controller {
  constructor(
    private readonly getPurchaseHistory :GetPurchaseHistory
  ){}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { accountId } = request.body;
      if (!accountId) return badRequest(new MissingParamError('accountId'));
      const history = await this.getPurchaseHistory.get(accountId);
      return ok({ history })
    } catch (error) {
      return serverError(error);
    }
  }
}