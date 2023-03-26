import { badRequest } from './../../helpers/http/http.helper';
import { ok } from '../../helpers/http/http.helper';
import { ErrorHandler } from '../../protocols/error-handler';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { Controller } from '../../protocols/controller';
import { RegisterProductsCelmar } from '../../../domain/useCases/product/register-products-celmar';

export class RegisterProductsCelmarController implements Controller {
  
  constructor(
    private errorHandler: ErrorHandler,
    private registerProductsCelmar: RegisterProductsCelmar
  ){}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { products } = request.body;
    try {
      if (!products) return badRequest(new Error('Products are required'));
      await this.registerProductsCelmar.register(products);
      return ok({ message: 'Products registered successfully' })
    } catch (error) {
      return this.errorHandler.handle(error);
    }
  }
}