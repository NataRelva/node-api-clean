import { LoadAccountByToken } from "../../middlewares/auth-middleware-protocols";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { ok, badRequest } from "../login/login-controllers-protocols";

export class LoadAccountController implements Controller {
  constructor(
    private readonly loadAccount: LoadAccountByToken
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> { 
    try {
      const accessToken = httpRequest.headers['x-access-token'];
      if(!accessToken) return badRequest(new Error('Token não informado!'))
      const account = await this.loadAccount.load(accessToken)
      if (!account) return badRequest(new Error('Token inválido!'))
      return ok(account)
    } catch (error) {
      return badRequest(error)
    }
  }
}