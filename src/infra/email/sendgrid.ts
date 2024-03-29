import { EmailProvider } from './../../presentation/protocols/email-provider';
import { SendEmailData } from './../../presentation/protocols/send-email';
import sgMail from "@sendgrid/mail";

export class SendGridEmailProvider implements EmailProvider {
    constructor(private readonly apiKey: string) {
        sgMail.setApiKey(this.apiKey);
    }

    async send(data: SendEmailData): Promise<void> {
        await sgMail.send(data);
    }
}