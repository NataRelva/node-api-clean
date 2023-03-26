import { AccountModel } from './../../../../domain/models/account/account';
export interface PrepareAccountRecoverPassword {
  prepare(email: string): Promise<AccountModel | null>
}