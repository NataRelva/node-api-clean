import { PullProductsCelmar } from './../../../domain/useCases/pull-products-celmar';
import { HttpRequest } from './../../protocols/http';
import { MissingParamError } from './../../errors/missing-param.error';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ok, badRequest } from './../../helpers/http/http.helper';
import { Controller } from './../../protocols/controller';
export class PullProductsCelmarController implements Controller {
  constructor(
    private readonly pullProductsCelmar: PullProductsCelmar,
    private readonly handleError: ErrorHandlerAdapter,
  ) {}
  async handle(request: HttpRequest): Promise<any> {
    const filter = request.body
    try {
      if (!filter) return badRequest(new MissingParamError('filter'))
      const products = await this.pullProductsCelmar.pull(filter)
      return ok(products)
    } catch (error) {
      return this.handleError.handle(error)
    }
  }
}