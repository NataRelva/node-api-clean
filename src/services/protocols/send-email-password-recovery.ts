import { AccountModel } from "../../domain/models/account";

export interface SendEmailPasswordRecovery {
  sendEmailPasswordRecovery: (accountData: AccountModel) => Promise<void>
}