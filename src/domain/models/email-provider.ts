import { SendEmailData } from './../../presentation/protocols/send-email';
export interface EmailProvider {
    send(data: SendEmailData): Promise<void>
}