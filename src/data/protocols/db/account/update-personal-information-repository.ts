import { AccountModel } from "../../../usecases/add-account/db-add-account-protocols"

export interface UpdatePersonalInformationRepository {
  updatePersonalInformation(data: { 
    accountId: string
    name: string
    cpfCnpj: string
    phone: string
  }) : Promise<AccountModel>
}