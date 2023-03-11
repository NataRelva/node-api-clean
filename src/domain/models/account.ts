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
    passwordResetExpires?: Date
}