import { AddAccountModel } from './../../../../domain/useCases/add-account';
import { UpdateAccessTokenRepository } from './../../../../data/protocols/db/account/update-access-token.repository';
import { LoadAccountByEmailRepository } from './../../../../data/protocols/db/account/load-account-by-email.repository';
import { AddAccountRepository } from './../../../../data/protocols/db/account/add-account-repository';
import { AccountModel } from './../../../../domain/models/account';
import { PrismaHelper } from '../helpers/prisma-helper';
const prisma = PrismaHelper.getPrisma();

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {

    async updateAccessToken(id: string, token: string): Promise<void> {
        await prisma.account.update({ where: { id }, data: { accessToken: token } });
    }

    async add(data: AddAccountModel): Promise<AccountModel> {
        const account = await prisma.account.create({ data });
        return account;
    }

    async loadByEmail(email: string): Promise<AccountModel | null> {
        const account = await prisma.account.findUnique({ where: { email } });
        return account;
    }

    async findOne(params: any) {
        const account = await prisma.account.findUnique({ where: params });
        return account;
    }
}