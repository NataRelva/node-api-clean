
import { CreatePurchaseRepository } from './../../../protocols/db/financial/create-purchase-repository/create-purchase-repository';
import { DataPurchaseEmail, Datum, PurchaseModel } from './../../../../domain/models/financial/purchase-entity';
import { CreatePurchase } from './../../../../domain/useCases/financial/purchase/create-purchase-usecase';
import { SendPurchaseConfirmationEmail } from '../../../../services/protocols';
export class DbCreatePurchase implements CreatePurchase {
  constructor(
    private readonly createPurchaseRepository: CreatePurchaseRepository,
    private readonly sendPurchaseConfirmationEmail: SendPurchaseConfirmationEmail
  ) {}
  async execute(cartId: string): Promise<PurchaseModel> {
    const purchase = await this.createPurchaseRepository.createPurchase(cartId)
    const dataPurchaseEmail: DataPurchaseEmail = {
      id: purchase.id,
      address_user: '',
      cpfCnpj: purchase.account.cpfCnpj,
      products: {
        data: purchase.cart.cartItem.map((product) => {
          return {
            product_name: product.product.name,
            quantity: product.quantity.toString(),
            sub_total: product.product.price * product.quantity
          }
        })
      },
      Sender_Name: purchase.account.name,
      Sender_Address: purchase.shippingAddress,
      Sender_State: '',
      Sender_City: '',
      Sender_Zip: '',
      date: {
        mm: purchase.createDate.getMonth() < 10 ? `0${purchase.createDate.getMonth()}` : purchase.createDate.getMonth().toString(),
        dd: purchase.createDate.getDate() < 10 ? `0${purchase.createDate.getDate()}` : purchase.createDate.getDate().toString(),
        yy: purchase.createDate.getFullYear().toString()
      },
      purchase_id: purchase.id,
      total: purchase.total.toString(),
      user_email: purchase.account.email,
      user_name: purchase.account.name,
      user_phone: purchase.account.phone
    }
    await this.sendPurchaseConfirmationEmail.sendFromPurchaseConfirmation(dataPurchaseEmail)
    return purchase
  }
}