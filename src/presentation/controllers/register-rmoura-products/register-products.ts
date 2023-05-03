import { RegisterProduct } from './../../../domain/useCases/product/register-product';
import { MissingParamError } from './../../errors/missing-param.error';
import { ErrorHandler } from './../../protocols/error-handler';
import { ok, badRequest } from './../../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { Controller } from './../../protocols/controller';
export class RegisterProductsController implements Controller {
  constructor(
    private readonly errorHandler: ErrorHandler,
    private readonly registerProducts: RegisterProduct,
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { products } = request.body
      console.log(products)
      if (!products) return badRequest(new MissingParamError('products'))
      await this.registerProducts.registerProducts(products)
      return ok('registrados com sucesso')
    } catch (error) {
      return this.errorHandler.handle(error)
    }
  }
}