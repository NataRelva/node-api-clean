import { AccountModel } from './../models/account';

export interface SendEmailPasswordRecovery {
    send(accountData: AccountModel): Promise<void>
}