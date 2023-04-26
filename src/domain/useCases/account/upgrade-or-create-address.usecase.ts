import { AddressModel } from "../../models/account";

export interface AddressRequest {
  street: string
  number: string
  district: string
  city: string
  state: string
  zipCode: string
}


export interface UpgradeOrCreateAddress {
  upgradeOrCreate(accountId: string, data: AddressRequest): Promise<AddressModel[]>
}