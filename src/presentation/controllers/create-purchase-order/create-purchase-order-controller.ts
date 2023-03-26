import { ShoppingCart } from './../../protocols/shopping-cart';
import { CreatePrePurchase, CreatePurchase, ProductCheckOut, ProductCheckIn } from './protocols';
import { ok, serverError, badRequest } from './../../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
// private readonly checkStockAvailability: CheckStockAvailability, (ISSO AQUI É UM DOMINIO DE OUTRA CAMADA)
export class CreatePurchaseOrderController {
  constructor (
    private readonly createPurchase: CreatePurchase,
    private readonly createPrePurchase: CreatePrePurchase,
    private readonly productCheckIn: ProductCheckIn,
    private readonly productCheckOut: ProductCheckOut,
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const shoppingCart: ShoppingCart = httpRequest.body
      
      if (!shoppingCart.products || Object.values(shoppingCart.products).length == 0) return badRequest(new Error('Missing param: products'))
      
      // VERIFICAR DISPONIBILIDADE DO PRODUTO
      const stockAvailability = await this.productCheckIn.checkIn(shoppingCart)

      // CONSTRUA UMA PRE COMPRA COM OS PRODUTOS (AQUI FARAR A VERIFICAÇÃO DE PREÇOS E DESCONTOS)
      const prePurchase = await this.createPrePurchase.create(stockAvailability)

      // CRIE O PEDIDO DA COMPRA NO FINANCEIRO
      const purchaseOrder = await this.createPurchase.create(prePurchase)

      // REALIZE O TRATAMENTO DE CHECKOUT (AQUI SERÁ REALIZADO O ENVIO DE EMAILS E ETC)
      const checkout = await this.productCheckOut.checkout(purchaseOrder)
      
      return ok({ message: 'Pedido criado com sucesso', checkout })
    } catch (error) {
      return serverError(error)
    }
  }
}