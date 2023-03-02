export interface CheckRegistrationRepository {
    check(cpfCnpj: string, email: string): Promise<void>
}