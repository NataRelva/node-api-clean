import { SendEmail, SendEmailData } from './../../presentation/protocols/send-email';
import { EmailProvider } from './../../presentation/protocols/email-provider';
export class SendEmailAdpter implements SendEmail {

    constructor(
        private readonly emailProvider: EmailProvider
    ) { }

    execute(data: SendEmailData): Promise<void> {
        return this.emailProvider.send(data);
    }
}