import { AddressRequest } from "../../../../domain/useCases/account/upgrade-or-create-address.usecase";
import { AddressModel } from "../../../usecases/add-account/db-add-account-protocols";

export interface UpdateOrCreateAddressRepository {
  updateOrCreate(accountId: string, data: AddressRequest): Promise<AddressModel[]>
}