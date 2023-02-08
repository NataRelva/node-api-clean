import { CpfCnpjFieldsValidation } from '../../presentation/helpers/validators/cpfcnpj-fields.validations'
import { EmailValidation } from '../../presentation/helpers/validators/email.validation'
import { RequiredFieldValid } from '../../presentation/helpers/validators/required-field.validation'
import { Validation } from '../../presentation/helpers/validators/validations'
import { ValidationComposite } from '../../presentation/helpers/validators/validations.composite'
import { CpfCnpjValidatorAdapter, ValidatorCpfCnpj } from '../../utils/cpf-cnpj-validator.adapter'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

const validCpfCnpj = new ValidatorCpfCnpj()

// This is the factory that will be used in the controller
export const makeSignupValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'phone', 'cpfCnpj']) {
        validations.push(new RequiredFieldValid(field))
    }
    validations.push(new CpfCnpjFieldsValidation('cpfCnpj', new CpfCnpjValidatorAdapter(validCpfCnpj)))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}