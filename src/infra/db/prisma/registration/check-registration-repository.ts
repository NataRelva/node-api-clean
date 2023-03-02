import { PrismaHelper } from "../helpers/prisma-helper"

export class CheckRegistrationRepository implements CheckRegistrationRepository {
    async check(cpfCnpj: string, email: string): Promise<void> {
        const prisma = PrismaHelper.getPrisma()
        const account = await prisma.account.findFirst({
            where: {
                OR: [
                    { cpfCnpj },
                    { email }
                ]
            }
        })
        if (account?.cpfCnpj == cpfCnpj) {
            throw 'CPF/CNPJ já cadastrado'
        } else if (account?.email == email) {
            throw 'E-mail já cadastrado'
        }
    }
}