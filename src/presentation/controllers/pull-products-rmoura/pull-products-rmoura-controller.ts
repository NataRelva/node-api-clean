import { HttpRequest, HttpResponse } from './../../protocols/http';
import { MissingParamError } from './../../errors/missing-param.error';
import { PullProductsRmoura } from './../../../domain/useCases/pull-products-rmoura';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ok, badRequest } from './../../helpers/http/http.helper';
import { Controller } from './../../protocols/controller';
export class PullProductsRmouraController implements Controller {
  constructor(
    private readonly pullProductsRmoura: PullProductsRmoura,
    private readonly handleError: ErrorHandlerAdapter,
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const filter = request.body
    try {
      if (!filter) return badRequest(new MissingParamError('filter'))
      const products = await this.pullProductsRmoura.pull(filter)
      return ok(products)
    } catch (error) {
      return this.handleError.handle(error)
    }
  }
}