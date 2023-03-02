import { JwtAdapter } from './../../../infra/criptography/jwt-adpter/jwt-adapter';
import { DbAuthentication } from './../../../data/usecases/authentication/db-authentication';
import { Authentication } from './../../../domain/useCases/authentication';
import { ErrorHandlerAdapter } from './../../../utils/error-handler-adapter';
import { AccountPrismaRepository } from './../../../infra/db/prisma/account-repository/account-prisma.repository';
import { LogPrismaRepository } from './../../../infra/db/prisma/log-repository/log-prisma-reposutory';
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { SignupController } from '../../../presentation/controllers/signup/signup-controllers'
import { Controller } from '../../../presentation/protocols/controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decoration/logs'
import { makeSignupValidation } from './singup.validation'
import env from '../../config/env';

export const makeSignupController = (): Controller => {
    const bcryptAdapter = new BcryptAdapter(12)
    const addAccount = new DbAddAccount(bcryptAdapter, new AccountPrismaRepository())
    const validationComposite = makeSignupValidation()
    const errorHandler = new ErrorHandlerAdapter();
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountPrismaRepository = new AccountPrismaRepository()
    const authentication = new DbAuthentication(accountPrismaRepository, bcryptAdapter, jwtAdapter, accountPrismaRepository)
    const signupController = new SignupController(addAccount, validationComposite, errorHandler, authentication)
    const logPrismaRepository = new LogPrismaRepository()
    return new LogControllerDecorator(signupController, logPrismaRepository)
}