export interface CheckRegistration {
    check(cpfCnpj: string, email: string): Promise<void>
}