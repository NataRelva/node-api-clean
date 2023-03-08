import { EmailProvider } from './../domain/models/email-provider';
import { SendEmail, SendEmailData } from './../presentation/protocols/send-email';
export class SendEmailAdpter implements SendEmail {

    constructor(
        private readonly emailProvider: EmailProvider
    ) { }

    execute(data: SendEmailData): Promise<void> {
        return this.emailProvider.send(data);
    }
}