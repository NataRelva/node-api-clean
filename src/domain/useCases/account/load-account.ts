import { AccountModel } from "../../models/account";

export interface LoadAccount {
  load(accessToken: string): Promise<AccountModel>
}