import { AccountModel } from '../../../domain/models/account';
import { AddAccount, AddAccountModel } from '../../../domain/useCases/add-account'
import { Encrypter } from '../../protocols/encrypter';

export class DbAddAccount implements AddAccount {

    private readonly encrypter: Encrypter
    constructor(encrypter: Encrypter) {
        this.encrypter = encrypter
    }

    async add(account: AddAccountModel): Promise<AccountModel> {
        const password = await this.encrypter.encrypt(account.password)
        return new Promise(resolver => resolver({
            cpfCnpj: '',
            email: '',
            id: '',
            name: '',
            password,
            phone: ''
        }))
    }
}