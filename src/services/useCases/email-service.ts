import { SendEmailData } from './../../presentation/protocols/send-email';
import { PurchaseModel } from './../../domain/models/financial/purchase-entity';
import { AccountModel } from './../../domain/models/account/account';
import { SendPurchaseConfirmationEmail } from './../protocols/send-purchase-confirmation-email';
import { SendEmailPasswordRecovery } from './send-mail-recovery-password';

import { MailService } from "@sendgrid/mail";
import env from '../../main/config/env';

export class EmailService implements SendEmailPasswordRecovery, SendPurchaseConfirmationEmail {

  protected sendEmailData: SendEmailData;
  constructor(
    private readonly sendGrid: MailService
  ) {
    this.sendGrid.setApiKey(env.sendGridKey);
  }

  async send(accountData: AccountModel): Promise<void> {
    this.sendEmailData = {
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
    this.sendGrid.send(this.sendEmailData)
  }

  async sendFromPurchaseConfirmation(purchaseData: PurchaseModel): Promise<boolean> {
    this.sendEmailData = { 
      to: purchaseData.account.email,
      from: env.emailFrom,
      subject: 'Confirmação de compra',
      templateId: env.templateIdPurchaseConfirmation,
      dynamicTemplateData: { 
        purchaseData
      }
    }
    try {
      this.sendGrid.send(this.sendEmailData)
      return true;
    } catch (error) {
      return false;
    }
  }
}