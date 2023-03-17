import { CheckRegistration } from './../../../presentation/protocols/check-registration';
import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {

    constructor(
        private readonly encrypter: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly checkRegistration: CheckRegistration) {
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.checkRegistration.check(account.cpfCnpj, account.email)
        const newPasswordHash = await this.encrypter.hash(account.password)
        return this.addAccountRepository.add(Object.assign({}, account, { password: newPasswordHash }))
    }
}