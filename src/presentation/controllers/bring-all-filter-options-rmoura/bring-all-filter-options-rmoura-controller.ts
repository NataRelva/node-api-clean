import { GetProductsFilter } from '../../../domain/useCases/product/get-products-filter';
import { ErrorHandler } from '../../protocols/error-handler';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Controller } from '../../protocols/controller';
import { FilterResponse } from '../../../domain/models/product/product-configuration';
import { ok } from "../../helpers/http/http.helper";
export class BringAllFilteroOtionsRmouraController implements Controller {
  constructor(
    private readonly errorHandler: ErrorHandler,
    private readonly getProductsFilter: GetProductsFilter
  ) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const filterResponse: FilterResponse = await this.getProductsFilter.exec()
      return ok({ filterResponse })
    } catch (error) {
      return this.errorHandler.handle(error)
    }
  }
}