import { EmailValidation, RequiredFieldValid, Validation, ValidationComposite } from "../../../presentation/helpers/validators/index"
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter"


export const makeLoginValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
        validations.push(new RequiredFieldValid(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)
}