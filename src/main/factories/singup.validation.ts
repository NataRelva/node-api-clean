import { RequiredFieldValid } from '../../presentation/helpers/validators/required-field.validation'
import { Validation } from '../../presentation/helpers/validators/validations'
import { ValidationComposite } from '../../presentation/helpers/validators/validations.composite'

export const makeSignupValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'phone', 'cpfCnpj']) {
        validations.push(new RequiredFieldValid(field))
    }
    return new ValidationComposite(validations)
}