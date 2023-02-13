import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account-mongo.repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log-mongo.repository'
import { SignupController } from '../../../presentation/controllers/signup/signup-controllers'
import { Controller } from '../../../presentation/protocols/controller'
import { CpfCnpjValidatorAdapter, ValidatorCpfCnpj } from '../../../utils/cpf-cnpj-validator.adapter'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../../decorators/log-controller-decoration/logs'
import { makeSignupValidation } from './singup.validation'

export const makeSignupController = (): Controller => {
    const bcryptAdapter = new BcryptAdapter(12)
    const addAccount = new DbAddAccount(bcryptAdapter, new AccountMongoRepository())
    const validationComposite = makeSignupValidation()
    const signupController = new SignupController(addAccount, validationComposite)
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signupController, logMongoRepository)
}