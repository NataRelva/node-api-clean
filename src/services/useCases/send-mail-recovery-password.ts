import { AccountModel } from './../../domain/models/account/account/account';
export interface SendEmailPasswordRecovery {
    send(accountData: AccountModel): Promise<void>
}