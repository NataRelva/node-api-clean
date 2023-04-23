import { UpdatePersonalInformation } from "../../../../domain/useCases/account/update-personal-information.usecase";
import { UpdatePersonalInformationRepository } from "../../../protocols/db/account/update-personal-information-repository";
import { AccountModel } from "../../add-account/db-add-account-protocols";

export class DbUpdatePersonalInformation implements UpdatePersonalInformation {

  constructor(
    private readonly updatePersonalInformationRepository: UpdatePersonalInformationRepository
  ) {} 

  async execute(data: {
    accountId: string
    name: string
    email: string
    phone: string
  }): Promise<AccountModel> {
    const updatedAccount = await this.updatePersonalInformationRepository.updatePersonalInformation(data)
    return updatedAccount
  }
}