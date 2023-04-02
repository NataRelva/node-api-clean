import env from '../../../main/config/env';
import sendGrid from "@sendgrid/mail";

import { AccountModel } from './../../../domain/models/account/account';
import { SendPurchaseConfirmationEmail, SendEmailPasswordRecovery } from './../../protocols';
import { PurchaseModel } from './../../../domain/models/financial/purchase-entity';

export class EmailService implements SendEmailPasswordRecovery, SendPurchaseConfirmationEmail {

  constructor() {
    sendGrid.setApiKey(env.sendGridKey);
  }

  async sendEmailPasswordRecovery(accountData: AccountModel): Promise<void> {
    const sendEmailData = {
      to: accountData.email,
      from: env.emailFrom,
      subject: 'Recuperação de senha',
      templateId: env.templateIdRecoveryPassword,
      dynamicTemplateData: {
        name: accountData.name,
        email: accountData.email,
        token: accountData.passwordResetToken
      }
    }
    sendGrid.send(sendEmailData)
  }

  async sendFromPurchaseConfirmation(purchaseData: PurchaseModel): Promise<boolean> {
    const sendEmailData = { 
      to: purchaseData.account.email,
      from: env.emailFrom,
      subject: 'Confirmação de compra',
      templateId: env.templateIdPurchaseConfirmation,
      dynamicTemplateData: { 
        purchaseData
      }
    }
    try {
      sendGrid.send(sendEmailData)
      return true;
    } catch (error) {
      return false;
    }
  }
}