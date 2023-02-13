import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {

    private readonly encrypter: Hasher
    private readonly addAccountRepository: AddAccountRepository
    constructor(encrypter: Hasher, addAccountRepository: AddAccountRepository) {
        this.encrypter = encrypter
        this.addAccountRepository = addAccountRepository
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        const newPasswordHash = await this.encrypter.hash(account.password)
        return this.addAccountRepository.add(Object.assign({}, account, { password: newPasswordHash }))
    }
}