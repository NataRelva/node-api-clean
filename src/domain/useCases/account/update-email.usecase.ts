import { AccountModel } from "../../models/account";

export interface UpdateEmail {
  execute: (data: { accountId: string, email: string }) => Promise<AccountModel>
}