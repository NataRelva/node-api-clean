import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication';
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adpter/bcrypt-adapter';
import { JwtAdapter } from '../../../../infra/criptography/jwt-adpter/jwt-adapter';
import { AccountPrismaRepository } from '../../../../infra/db/prisma/account-repository/account-prisma.repository';
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email.repository';
import env from '../../../config/env';
export const makeDbAuthentication = (): DbAuthentication => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountPrismaRepository = new AccountPrismaRepository()
    return new DbAuthentication(accountPrismaRepository, bcryptAdapter, jwtAdapter, accountPrismaRepository)
}