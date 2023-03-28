import { FilterRequest } from './../../../domain/models/product/product-configuration';
import { PullProductsCelmar } from './../../../domain/useCases/product/pull-products-celmar';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { MissingParamError } from './../../errors/missing-param.error';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ok, badRequest } from './../../helpers/http/http.helper';
import { Controller } from './../../protocols/controller';
export class PullProductsCelmarController implements Controller {
  constructor(
    private readonly pullProductsCelmar: PullProductsCelmar,
    private readonly handleError: ErrorHandlerAdapter,
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const filterRequest: FilterRequest = request.body
    try {
      if (!filterRequest || !filterRequest.filter) return badRequest(new MissingParamError('filter'))
      const products = await this.pullProductsCelmar.pull(filterRequest)
      return ok(products)
    } catch (error) {
      return this.handleError.handle(error)
    }
  }
}