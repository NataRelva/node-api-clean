import { ValidationComposite } from "../../presentation/helpers/validators/validations.composite"
import { makeSignupValidation } from "./singup.validation"
import { RequiredFieldValid } from "../../presentation/helpers/validators/required-field.validation"
import { Validation } from "../../presentation/helpers/validators/validations"

jest.mock('../../presentation/helpers/validators/validations.composite')

describe('Signup Validation', () => {
    test('Should call Validation with correct values', async () => {
        makeSignupValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'phone', 'cpfCnpj']) {
            validations.push(new RequiredFieldValid(field))
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})