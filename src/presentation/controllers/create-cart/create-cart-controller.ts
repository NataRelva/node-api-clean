import { CheckProductAvailability } from './../../../domain/useCases/product/check-product-availability';
import { CreateCart } from './../../../domain/useCases/logistics/create-cart/create-cart';
import { Order } from './../../../domain/models/logistics/order';
import { serverError, ok, badRequest, verifyProps } from './../../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { Controller } from './../../protocols/controller';

export class CreatCartController implements Controller {
  constructor (
    private readonly checkProductAvailability: CheckProductAvailability,
    private readonly createCart: CreateCart,
   ) {}
   async handle(httpRequest:HttpRequest): Promise<HttpResponse> {
    const order = verifyProps<Order[]>(httpRequest, 'order')
    const accountId = verifyProps<string>(httpRequest, 'accountId')
    try {
      if (!order) return badRequest(new Error('Pedido não informado'))
      if (!accountId) return badRequest(new Error('Conta não informada'))
      const productIsAvailablity = await this.checkProductAvailability.execute(order);
      if (!productIsAvailablity) return badRequest(new Error('Produto indisponível'))
      const cart = await this.createCart.execute(order, accountId)
      return ok(cart)
    } catch (error) { 
      return serverError(error)
    }
  }
}