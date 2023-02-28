import { LogPrismaRepository } from './../../../infra/db/prisma/log-repository/log-prisma-reposutory';
import { AccountPrismaRepository } from './../../../infra/db/prisma/account-repository/account-prisma.repository';
import { Controller } from "../../../presentation/protocols/controller"
import { LoginController } from "../../../presentation/controllers/login/login-controllers"
import { LogControllerDecorator } from "../../decorators/log-controller-decoration/logs"
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication"
import { makeLoginValidation } from './login-validation-factory'
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adpter/bcrypt-adapter"
import { JwtAdapter } from "../../../infra/criptography/jwt-adpter/jwt-adapter"
import env from "../../config/env"

export const makeLoginController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountPrismaRepository = new AccountPrismaRepository()
    const dbAuthentication = new DbAuthentication(accountPrismaRepository, bcryptAdapter, jwtAdapter, accountPrismaRepository)
    const loginController = new LoginController(makeLoginValidation(), dbAuthentication)
    const logPrismaRepository = new LogPrismaRepository()
    return new LogControllerDecorator(loginController, logPrismaRepository)
}