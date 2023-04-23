import { LoadAccountByEmailRepository } from './../../protocols/db/account/load-account-by-email.repository';
import { Hasher } from './../../protocols/criptography/hasher';
import { ChangeAccountPasswordRepository } from './../../protocols/db/account/change-account-passaword-repository';
import { ChangeAccountPassword } from './../../../domain/useCases/account/change-account-password';
export class DbChangeAccountPassword implements ChangeAccountPassword {
    constructor(
        private readonly changeAccountPasswordRepository: ChangeAccountPasswordRepository,
        private readonly loadAccountByEmail: LoadAccountByEmailRepository,
        private readonly hasher: Hasher,
    ) { }
    async change(token: string, email: string, password: string, call: 'login' | 'profile' = 'login'): Promise<void> {
        const account = await this.loadAccountByEmail.loadByEmail(email)
        if (!account) throw new Error('Email não encontrado!')
        if (account.passwordResetExpires && call === 'login') {
            const tokenResetExpiration = new Date(account.passwordResetExpires)
            if (tokenResetExpiration < new Date()) throw new Error('Token expirado!')
        }
        if (account.passwordResetToken !== token && call == 'login') throw new Error('Token inválido!')
        const newPassword = await this.hasher.hash(password)
        await this.changeAccountPasswordRepository.change(email, newPassword)
    }
}