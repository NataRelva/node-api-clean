export interface IMessage {
    to: string
    subject?: string
    body?: string
}

export interface SendEmailPasswordRecovery {
    send(props: IMessage): Promise<void>
}