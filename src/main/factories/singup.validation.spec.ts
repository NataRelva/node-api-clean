import { ValidationComposite } from "../../presentation/helpers/validators/validations.composite"
import { makeSignupValidation } from "./singup.validation"
import { RequiredFieldValid } from "../../presentation/helpers/validators/required-field.validation"
import { Validation } from "../../presentation/helpers/validators/validations"
import { EmailValidation } from "../../presentation/helpers/validators/email.validation"
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter"
import { CpfCnpjFieldsValidation } from "../../presentation/helpers/validators/cpfcnpj-fields.validations"
import { CpfCnpjValidatorAdapter, ValidatorCpfCnpj } from "../../utils/cpf-cnpj-validator.adapter"

jest.mock('../../presentation/helpers/validators/validations.composite')

const validCpfCnpj = new ValidatorCpfCnpj()

describe('Signup Validation', () => {
    test('Should call Validation with correct values', async () => {
        makeSignupValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'phone', 'cpfCnpj']) {
            validations.push(new RequiredFieldValid(field))
        }
        validations.push(new CpfCnpjFieldsValidation('cpfCnpj', new CpfCnpjValidatorAdapter(validCpfCnpj)))
        validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})