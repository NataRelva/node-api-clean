import { AddAccountModel } from "../../../../domain/useCases/account/add-account";
import { AccountModel } from "../../../../domain/models/account/account";

export interface AddAccountRepository {
    add(accountData: AddAccountModel): Promise<AccountModel>
}