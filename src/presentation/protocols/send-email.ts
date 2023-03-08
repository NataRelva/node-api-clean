export interface SendEmailData {
    to: string;
    from: string;
    subject: string;
    templateId: string;
    dynamicTemplateData: any;
}

export interface SendEmail {
    execute(data: SendEmailData): Promise<void>
}