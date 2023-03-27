import { SendPurchaseConfirmationEmail } from './../../../../domain/useCases/product/email/send-purchase-confirmation-email';
import { LoadProductsDetails } from './../../../../domain/useCases/logistics/loadProductsDetails/load-products-details';
import { PurchaseModel } from './../../../../domain/models/financial/purchase-entity';
import { ProductCheckOut } from './../../../../domain/useCases/logistics/productCheckOut/product-check-out-usecase';
import { ProductCheckOutData, ProductCheckOutDetails } from './../../../../domain/models/logistics/product-check-out-data';

export class ProductCheckOutRepository implements ProductCheckOut {
  constructor(
    private readonly loadProductsDetails: LoadProductsDetails,
    private readonly sendPurchaseConfirmationEmail: SendPurchaseConfirmationEmail // Isso aqui é um domínio de outra camada (infra)
  ) {}
  async checkout(data: PurchaseModel): Promise<ProductCheckOutData> {
    const productsDetails: ProductCheckOutDetails[] = await this.loadProductsDetails.load(data.cart.id)
    const sendEmail = await this.sendPurchaseConfirmationEmail.send(data)
    const productsCheckOutData: ProductCheckOutData = { 
      purchaseId: data.id,
      sendEmail,
      status: sendEmail ? 'inProgress' : 'pending',
      productsDetails,
      createDate: data.createDate
    }
    return productsCheckOutData
  }
}