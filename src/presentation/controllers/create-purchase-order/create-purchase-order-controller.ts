import { CreatePurchase } from '../../../domain/useCases/financial/purchase/create-purchase-usecase';
import { Controller } from './../../protocols/controller';
import { ok, serverError, badRequest } from './../../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';

export class StartPurchaseProcess implements Controller {
  constructor (
    private readonly createPurchase: CreatePurchase,
  ) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { cartId } = httpRequest.body;
      if(!cartId) return badRequest(new Error('Carrinho não informado'))
      const purchase = await this.createPurchase.execute(cartId);
      return ok({ message: 'Pedido criado com sucesso', purchase })
    } catch (error) {
      return serverError(error)
    }
  }
}