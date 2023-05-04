import { HttpRequest, HttpResponse } from './../../protocols/http';
import { MissingParamError } from './../../errors/missing-param.error';

import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ok, badRequest } from './../../helpers/http/http.helper';
import { Controller } from './../../protocols/controller';
import { LoadProductsUsecase } from '../../../domain/useCases/product/load-products/load-products.usecase';
export class LoadProductsController implements Controller {
  constructor(
    private readonly loadProducts: LoadProductsUsecase,
    private readonly handleError: ErrorHandlerAdapter,
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const filter = request.body
    const providerId = request.body.providerId
    try {
      if (!filter) return badRequest(new MissingParamError('filter'))
      const products = await this.loadProducts.execute(filter, providerId)
      return ok(products)
    } catch (error) {
      return this.handleError.handle(error)
    }
  }
}