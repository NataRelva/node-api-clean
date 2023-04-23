import { PrismaClient } from '@prisma/client';
import { UpdatePasswordResetToken } from './../../../../data/protocols/db/account/update-password-reset-token';
import { ChangeAccountPasswordRepository } from './../../../../data/protocols/db/account/change-account-passaword-repository';
import { LoadAccountByTokenRepository } from './../../../../data/protocols/db/account/load-account-by-token.repository';
import { AddAccountModel } from './../../../../domain/useCases/account/add-account';
import { UpdateAccessTokenRepository } from './../../../../data/protocols/db/account/update-access-token.repository';
import { LoadAccountByEmailRepository } from './../../../../data/protocols/db/account/load-account-by-email.repository';
import { AddAccountRepository } from './../../../../data/protocols/db/account/add-account-repository';
import { AccountModel } from './../../../../domain/models/account/account';
import { UpdatePersonalInformation } from '../../../../domain/useCases/account/update-personal-information.usecase';
import { UpdatePersonalInformationRepository } from '../../../../data/protocols/db/account/update-personal-information-repository';

const prisma = new PrismaClient();

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, ChangeAccountPasswordRepository, UpdatePasswordResetToken, UpdatePersonalInformationRepository {
    
    async updatePersonalInformation(data: { 
        accountId: string
        name: string
        email: string
        phone: string
    } ): Promise<AccountModel> { 
        const updatedAccount = await prisma.account.update({ where: { id: data.accountId }, data: { name: data.name, email: data.email, phone: data.phone } });
        return updatedAccount as AccountModel;
    }
    
    async updatePasswordResetToken(email: string, passwordResetToken: string, passwordResetExpires: Date): Promise<AccountModel | null> { 
        console.log('passwordResetToken', passwordResetExpires)
        const account = await prisma.account.findUnique({ where: { email } });
        if (!account) throw new Error('Email não encontrado!')
        return await prisma.account.update({ where: { email }, data: { passwordResetToken, passwordResetExpires }});
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