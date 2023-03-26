import { SendEmail } from './../../protocols/send-email';
import { ok, serverError, badRequest } from './../../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { CreateOrder } from './../../../domain/useCases/financial/create-order';
export class CreatePurchaseOrderController {
  constructor (
    private readonly createPurchaseOrder: CreateOrder,
    private readonly sendEmail: SendEmail
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { products } = httpRequest.body
      if (!products || Object.values(products).length == 0) return badRequest(new Error('Missing param: products'))
      await this.createPurchaseOrder.create(products)
      
      return ok({message: 'Pedido criado com sucesso'})
    } catch (error) {
      return serverError(error)
    }
  }
}