import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { AccountPrismaRepository } from './../../../infra/db/prisma/account-repository/account-prisma.repository';
import { LogPrismaRepository } from './../../../infra/db/prisma/log-repository/log-prisma-reposutory';
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { SignupController } from '../../../presentation/controllers/signup/signup-controllers'
import { Controller } from '../../../presentation/protocols/controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decoration/logs'
import { makeSignupValidation } from './singup.validation'

export const makeSignupController = (): Controller => {
    const bcryptAdapter = new BcryptAdapter(12)
    const addAccount = new DbAddAccount(bcryptAdapter, new AccountPrismaRepository())
    const validationComposite = makeSignupValidation()
    const errorHandler = new ErrorHandlerAdapter();
    const signupController = new SignupController(addAccount, validationComposite, errorHandler)
    const logPrismaRepository = new LogPrismaRepository()
    return new LogControllerDecorator(signupController, logPrismaRepository)
}