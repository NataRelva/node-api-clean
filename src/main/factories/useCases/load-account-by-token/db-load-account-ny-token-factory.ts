import { JwtAdapter } from './../../../../infra/criptography/jwt-adpter/jwt-adapter';
import { AccountPrismaRepository } from './../../../../infra/db/prisma/account-repository/account-prisma.repository';
import { DbLoadAccountByToken } from './../../../../data/usecases/load-account-by-token/db-load-account-by-token';
import { LoadAccountByToken } from './../../../../domain/useCases/account/load-account-by-token';
import env from '../../../config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
    const accountPrismaRepository = new AccountPrismaRepository();
    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    return new DbLoadAccountByToken(jwtAdapter, accountPrismaRepository);
}