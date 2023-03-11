import { BcryptAdapter } from './../../../infra/criptography/bcrypt-adpter/bcrypt-adapter';
import { AccountPrismaRepository } from './../../../infra/db/prisma/account-repository/account-prisma.repository';
import { DbChangeAccountPassword } from './../../../data/usecases/chage-account-password/db-change-account-password';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { ChangeAccountPasswordController } from './../../../presentation/controllers/change-account-password/change-account-password.controller';
import { Controller } from './../../../presentation/protocols/controller';
import env from '../../config/env';
export const makeChangeAccountPasswordController = (): Controller => {
    const changeAccountPasswordRepository = new AccountPrismaRepository()
    const loadAccountByTokenRepository = new AccountPrismaRepository()
    const bcryptAdapter = new BcryptAdapter(env.salt)
    const changeAccountPassword = new DbChangeAccountPassword(changeAccountPasswordRepository,loadAccountByTokenRepository, bcryptAdapter)
    const errorHandler = new ErrorHandlerAdapter()
    return new ChangeAccountPasswordController(errorHandler, changeAccountPassword)
}