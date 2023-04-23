import { AccountModel } from "../../../usecases/add-account/db-add-account-protocols";

export interface UpdateEmailRepository { 
  updateEmail: (data: { accountId: string, email: string }) => Promise<AccountModel>
}