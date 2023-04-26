export interface AccountModel {
    id: string
    name: string
    email: string
    password: string
    phone: string
    cpfCnpj: string
    accessToken?: string
    role?: string
    passwordResetToken?: string
    passwordResetExpires?: Date,
    address?: AddressModel[]
}

export interface AddressModel { 
    id         : string
    street     : string
    number     : string
    district   : string
    city       : string
    state      : string
    zipCode    : string
    createdAt  : Date
    updatedAt  : Date
    account    : AccountModel 
}