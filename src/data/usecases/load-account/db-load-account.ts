import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token.repository';
import { LoadAccount } from './../../../domain/useCases/account/load-account';
export class DbLoadAccount implements LoadAccount {
  constructor(
    private readonly loadAccount: LoadAccountByTokenRepository
  ) {} 
  async load(accessToken: string): Promise<any> {
    return await this.loadAccount.loadByToken(accessToken)
  }
} 