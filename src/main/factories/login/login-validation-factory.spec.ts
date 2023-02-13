import { EmailValidation, RequiredFieldValid, Validation, ValidationComposite } from "../../../presentation/helpers/validators/index"
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter"
import { makeLoginValidation } from "./login-validation-factory"

jest.mock('../../../presentation/helpers/validators/validations.composite')

describe('LoginValidation Factory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeLoginValidation()
        const validations: Validation[] = []
        for (const field of ['email', 'password']) {
            validations.push(new RequiredFieldValid(field))
        }
        validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})