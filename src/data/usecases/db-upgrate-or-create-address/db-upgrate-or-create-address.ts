import { AddressRequest, UpgradeOrCreateAddress } from "../../../domain/useCases/account/upgrade-or-create-address.usecase"
import { UpdateOrCreateAddressRepository } from "../../protocols/db/account/update-personal-information.repository"
import { AddressModel } from "../add-account/db-add-account-protocols"

export class DbUpgrateOrCreateAddress implements UpgradeOrCreateAddress {
  constructor(
    private readonly updatePersonalInformationRepository: UpdateOrCreateAddressRepository
  ) {}

  async upgradeOrCreate(accountId: string, data: AddressRequest): Promise<AddressModel[]> {
    // VERIFICAR SE DATA É VALIDA
    if (!accountId) throw new Error('accountId is required')
    if (!data) throw new Error('data is required')
    if (!data.street) throw new Error('street is required')
    if (!data.number) throw new Error('number is required')
    if (!data.district) throw new Error('district is required')
    if (!data.city) throw new Error('city is required')
    if (!data.state) throw new Error('state is required')
    if (!data.zipCode) throw new Error('zipCode is required')

    // VERIFICAR SE TODAS AS CHAVES SÃO STRING SE NÃO TENTAR CONVERTER
    const keys = Object.keys(data)
    for (const key of keys) { 
      if (typeof data[key] !== 'string') throw new Error(`${key} must be a string`)
    }

    const account = await this.updatePersonalInformationRepository.updateOrCreate(accountId, data)
    return account
  }
}