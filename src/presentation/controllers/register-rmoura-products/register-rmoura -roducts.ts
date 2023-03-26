import { MissingParamError } from './../../errors/missing-param.error';
import { RegisterRmouraProduct } from './../../../domain/useCases/product/register-rmoura-product';
import { ErrorHandler } from './../../protocols/error-handler';
import { ok, badRequest } from './../../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { Controller } from './../../protocols/controller';
export class RegisterRmouraProductsController implements Controller {
  constructor(
    private readonly errorHandler: ErrorHandler,
    private readonly registerRmouraProducts: RegisterRmouraProduct,
  ) {}
  /** Precisa ainda fazer a parte da validação da request */
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { products } = request.body
      if (!products) return badRequest(new MissingParamError('products'))
      await this.registerRmouraProducts.register(products)
      return ok('registrados com sucesso')
    } catch (error) {
      return this.errorHandler.handle(error)
    }
  }
}