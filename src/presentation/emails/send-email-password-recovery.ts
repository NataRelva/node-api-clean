interface SendEmailPasswordRecovery {
    send(account: AccountModel): Promise<void>
}
import { SendEmail, SendEmailData } from './../protocols/send-email';
import env from '../../main/config/env';
import { AccountModel } from './../../domain/models/account/account';
export class SendEmailPasswordRecoveryAdpter implements SendEmailPasswordRecovery {
    constructor(
        private readonly sendEmail: SendEmail
    ) { }
    send(account: AccountModel): Promise<void> {
        const data: SendEmailData = {
            to: account.email,
            from: env.emailFrom,
            subject: 'Recuperação de senha',
            templateId: env.templateIdRecoveryPassword,
            dynamicTemplateData: {
                name: account.name,
                email: account.email,
                token: account.passwordResetToken
            }
        }

        return this.sendEmail.execute(data);
    }
}