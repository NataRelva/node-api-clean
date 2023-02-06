import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignupController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols/controller'
import { CpfCnpjValidatorAdapter, ValidatorCpfCnpj } from '../../utils/cpf-cnpj-validator.adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/logs'

export const makeSignupController = (): Controller => {
    const validatorCpfCnpj = new ValidatorCpfCnpj()
    const bcryptAdapter = new BcryptAdapter(12)
    const addAccount = new DbAddAccount(bcryptAdapter, new AccountMongoRepository())
    const emailValidator = new EmailValidatorAdapter()
    const cpfCnpjValidator = new CpfCnpjValidatorAdapter(validatorCpfCnpj)
    const signupController = new SignupController(emailValidator, addAccount, cpfCnpjValidator)
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signupController, logMongoRepository)
}