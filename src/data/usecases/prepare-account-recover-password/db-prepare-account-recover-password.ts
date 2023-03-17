import { UpdatePasswordResetToken } from './../../protocols/db/account/update-password-reset-token';
import { RandomUuid } from './../../protocols/criptography/random';
import { Encrypter } from './../../protocols/criptography/encrypter';
import { LoadAccountByEmailRepository } from './../../protocols/db/account/load-account-by-email.repository';
import { AccountModel } from '../add-account/db-add-account-protocols';
import { PrepareAccountRecoverPassword } from './../../protocols/db/account/prepare-account-recover-password';

export class DbPrepareAccountRecoverPassword implements PrepareAccountRecoverPassword {
  constructor(
    private readonly updatePasswordResetToken: UpdatePasswordResetToken,
    private readonly random: RandomUuid,
  ) {}
  async prepare(email: string): Promise<AccountModel | null> {
    const passwordResetToken = await this.random.random()
    const passwordResetExpires = new Date(Date.now() + 86400000)
    const account = await this.updatePasswordResetToken.updatePasswordResetToken(email, passwordResetToken, passwordResetExpires)
    if (!account) return null
    return account
  }
}