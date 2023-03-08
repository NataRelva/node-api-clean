import { SendEmailPasswordRecovery } from './../../domain/useCases/send-mail-recovery-password';
import { SendEmail, SendEmailData } from './../protocols/send-email';
import env from '../../main/config/env';
import { AccountModel } from './../../domain/models/account';
export class SendEmailPasswordRecoveryAdpter implements SendEmailPasswordRecovery {
    constructor(
        private readonly sendEmail: SendEmail
    ) { }
    send(account: AccountModel, token: string): Promise<void> {
        const data: SendEmailData = {
            to: account.email,
            from: env.emailFrom,
            subject: 'Recuperação de senha',
            templateId: env.templateIdRecoveryPassword,
            dynamicTemplateData: {
                name: account.name,
                token
            }
        }

        return this.sendEmail.execute(data);
    }
}