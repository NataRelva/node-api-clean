import { AccountModel } from "../../../usecases/add-account/db-add-account-protocols"

export interface UpdatePersonalInformationRepository {
  updatePersonalInformation(data: { 
    accountId: string
    name: string
    email: string
    phone: string
  }) : Promise<AccountModel>
}