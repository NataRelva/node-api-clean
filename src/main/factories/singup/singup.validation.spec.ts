import {
    CpfCnpjFieldsValidation,
    EmailValidation,
    RequiredFieldValid,
    Validation,
    ValidationComposite
} from '../../../presentation/helpers/validators'
import { makeSignUpValidation } from './singup-factory.validator'
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter"
import { CpfCnpjValidatorAdapter, ValidatorCpfCnpj } from "../../../utils/cpf-cnpj-validator.adapter"

jest.mock('../../../presentation/helpers/validators/validations.composite')

const validCpfCnpj = new ValidatorCpfCnpj()

describe('Signup Validation', () => {
    test('Should call Validation with correct values', async () => {
        makeSignUpValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'password', 'phone']) {
            validations.push(new RequiredFieldValid(field))
        }
        const cpfCnpjValidatorAdapter = new CpfCnpjValidatorAdapter(validCpfCnpj)
        const emailValidatorAdapter = new EmailValidatorAdapter()
        validations.push(new CpfCnpjFieldsValidation('cpfCnpj', cpfCnpjValidatorAdapter))
        validations.push(new EmailValidation('email', emailValidatorAdapter))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})