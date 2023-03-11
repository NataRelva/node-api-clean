import { PrismaClient } from '@prisma/client';
import { UpdatePasswordResetToken } from './../../../../data/protocols/db/account/update-password-reset-token';
import { ChangeAccountPasswordRepository } from './../../../../data/protocols/db/account/change-account-passaword-repository';
import { LoadAccountByTokenRepository } from './../../../../data/protocols/db/account/load-account-by-token.repository';
import { AddAccountModel } from './../../../../domain/useCases/add-account';
import { UpdateAccessTokenRepository } from './../../../../data/protocols/db/account/update-access-token.repository';
import { LoadAccountByEmailRepository } from './../../../../data/protocols/db/account/load-account-by-email.repository';
import { AddAccountRepository } from './../../../../data/protocols/db/account/add-account-repository';
import { AccountModel } from './../../../../domain/models/account';

const prisma = new PrismaClient();

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, ChangeAccountPasswordRepository, UpdatePasswordResetToken {
    async updatePasswordResetToken(email: string, passwordResetToken: string, passwordResetExpires: Date): Promise<AccountModel | null> { 
        const account = await prisma.account.update({ where: { email }, data: { passwordResetToken, passwordResetExpires } });
        if (!account) return null
        return account as AccountModel
    }
    
    async change(email: string, password: string): Promise<void> {
        const account = await prisma.account.update({ where: { email }, data: { password }});
        if (!account) throw new Error('Email não encontrado!')
    }

    async updateAccessToken(id: string, token: string): Promise<void> {
        await prisma.account.update({ where: { id }, data: { accessToken: token } });
    }

    async add(data: AddAccountModel): Promise<AccountModel> {
        const account = await prisma.account.create({ data });
        return account as AccountModel;
    }

    async loadByEmail(email: string): Promise<AccountModel | null> {
        const account = await prisma.account.findUnique({ where: { email } });
        return account as AccountModel;
    }

    async findOne(params: any) {
        const account = await prisma.account.findUnique({ where: params });
        return account as AccountModel;
    }

    async loadByToken(token: string, role?: string): Promise<AccountModel | null> {
        const account = await prisma.account.findUnique({ where: { accessToken: token } });
        if (account) {
            if (role && account.role !== role) {
                return null;
            }
            return account as AccountModel;
        }
        return null
    }
}