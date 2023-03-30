import { CheckProductAvailability } from './../../../domain/useCases/product/check-product-availability';
import { CreateCart } from './../../../domain/useCases/product/create-cart';
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
    try {
      // ---------------------------------> validador
      if (!order) return badRequest(new Error('Pedido não informado'))
      const productIsAvailablity = await this.checkProductAvailability.execute(order);
      if (!productIsAvailablity) return badRequest(new Error('Produto indisponível'))
      // <--------------------------------- validador
      const cart = await this.createCart.execute(order)
      return ok(cart)
    } catch (error) { 
      return serverError(error)
    }
  }
}