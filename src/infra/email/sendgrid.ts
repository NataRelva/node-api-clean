import { EmailProvider } from './../../domain/models/email-provider';
import { SendEmailData } from './../../presentation/protocols/send-email';
import sgMail from "@sendgrid/mail";

export class SendGridEmailProvider implements EmailProvider {
    constructor(private readonly apiKey: string) {
        sgMail.setApiKey(apiKey);
    }

    async send(data: SendEmailData): Promise<void> {
        await sgMail.send(data);
    }
}