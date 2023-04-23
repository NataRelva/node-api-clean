import { AccountModel } from "../../models/account"

interface ParamsUpdate {
  accountId: string
  name: string
  email: string
  phone: string
}

export interface UpdatePersonalInformation {
  execute: (data: ParamsUpdate ) => Promise<AccountModel>
}