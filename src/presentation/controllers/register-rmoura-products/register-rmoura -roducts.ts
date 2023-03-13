import { ErrorHandler } from './../../protocols/error-handler';
import { ok } from './../../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { Controller } from './../../protocols/controller';
export class RegisterRmouraProducts implements Controller {
  constructor(
    private readonly errorHandler: ErrorHandler
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      return ok('registrados com sucesso')
    } catch (error) {
      return this.errorHandler.handle(error)
    }
  }
}