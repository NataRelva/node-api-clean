import { AccountModel } from './../../models/account/account';
export interface AddAccountModel {
    name: string
    email: string
    password: string
    phone: string
    cpfCnpj: string
    accessToken?: string
    role?: string
}

export interface AddAccount {
    add(account: AddAccountModel): Promise<AccountModel>
}