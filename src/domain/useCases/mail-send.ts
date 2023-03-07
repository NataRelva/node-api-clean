export interface MailSend {
    sendMail(to: string, subject: string, type?: 'password_recovery'): Promise<boolean | Error>
}