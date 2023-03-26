import { EmailValidation } from "../../../presentation/helpers/validators/email.validation"
import { Validation } from "../../../presentation/helpers/validators/validations"
import { ValidationComposite } from "../../../presentation/helpers/validators/validations.composite"
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter"
import { RequiredFieldValid } from "../../../presentation/helpers/validators/required-field.validation"
import { CpfCnpjFieldsValidation } from "../../../presentation/helpers/validators/cpfcnpj-fields.validations"
import { CpfCnpjValidatorAdapter, ValidatorCpfCnpj } from "../../../utils/cpf-cnpj-validator.adapter"

const validCpfCnpj = new ValidatorCpfCnpj()

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'password', 'phone']) {
        validations.push(new RequiredFieldValid(field))
    }
    validations.push(new CpfCnpjFieldsValidation('cpfCnpj', new CpfCnpjValidatorAdapter(validCpfCnpj)))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}