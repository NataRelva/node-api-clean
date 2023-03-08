import { EmailValidatorAdapter } from './../../../utils/email-validator-adapter';
import { EmailValidation } from './../../../presentation/helpers/validators/email.validation';
import { RequiredFieldValid } from './../../../presentation/helpers/validators/required-field.validation';
import { Validation } from '../../../presentation/helpers/validators/validations';
import { ValidationComposite } from './../../../presentation/helpers/validators/validations.composite';
export const makeValidatorPasswordRecovery = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['email']) {
        validations.push(new RequiredFieldValid(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations);
}