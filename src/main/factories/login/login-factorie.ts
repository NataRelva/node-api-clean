import { Controller } from "../../../presentation/protocols/controller"
import { LoginController } from "../../../presentation/controllers/login/login-controllers"
import { LogControllerDecorator } from "../../decorators/log-controller-decoration/logs"
import { LogMongoRepository } from "../../../infra/db/mongodb/log-repository/log-mongo.repository"
import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication"
import { makeLoginValidation } from './login-validation-factory'
import { AccountMongoRepository } from "../../../infra/db/mongodb/account-repository/account-mongo.repository"
import { BcryptAdapter } from "../../../infra/criptography/bcrypt-adpter/bcrypt-adapter"
import { JwtAdapter } from "../../../infra/criptography/jwt-adpter/jwt-adapter"
import env from "../../config/env"

export const makeLoginController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    const loginController = new LoginController(makeLoginValidation(), dbAuthentication)
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(loginController, logMongoRepository)
}