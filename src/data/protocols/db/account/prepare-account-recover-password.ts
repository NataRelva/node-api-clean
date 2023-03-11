import { AccountModel } from './../../../../domain/models/account';
export interface PrepareAccountRecoverPassword {
  prepare(email: string): Promise<AccountModel | null>
}