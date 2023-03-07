import { AccountModel } from './../models/account';

export interface SendEmailPasswordRecovery {
    send(accountData: AccountModel, accessToken: string): Promise<void>
}