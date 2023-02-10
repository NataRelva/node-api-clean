import {
    CpfCnpjFieldsValidation,
    EmailValidation,
    RequiredFieldValid,
    Validation,
    ValidationComposite
} from '../../../presentation/helpers/validators'
import { CpfCnpjValidatorAdapter, ValidatorCpfCnpj } from '../../../utils/cpf-cnpj-validator.adapter'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'

const validCpfCnpj = new ValidatorCpfCnpj()

export const makeSignupValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'password', 'phone']) {
        validations.push(new RequiredFieldValid(field))
    }
    const cpfCnpjValidatorAdapter = new CpfCnpjValidatorAdapter(validCpfCnpj)
    const emailValidatorAdapter = new EmailValidatorAdapter()
    validations.push(new CpfCnpjFieldsValidation('cpfCnpj', cpfCnpjValidatorAdapter))
    validations.push(new EmailValidation('email', emailValidatorAdapter))
    return new ValidationComposite(validations)
}