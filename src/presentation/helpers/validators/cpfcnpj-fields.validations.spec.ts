import { CpfCnpjValidatorAdapter, ValidatorCPFCNPJ, ValidatorCpfCnpj } from "../../../utils/cpf-cnpj-validator.adapter"
import { InvalidParamError } from "../../errors/invalid-param.error"
import { CpfCnpjValidator } from "../../protocols/cpf-cnpj-validator"
import { badRequest } from "../http.helper"
import { CpfCnpjFieldsValidation } from "./cpfcnpj-fields.validations"

const make = () => {

}

const makeValidatorCpfCnpj = () => {
    class ValidatorCpfCnpjStub implements CpfCnpjValidator {
        private readonly validaCpfCnpj: ValidatorCPFCNPJ
        constructor(
            validaCpfCnpj: ValidatorCPFCNPJ
        ) {
            this.validaCpfCnpj = validaCpfCnpj
        }
        isValid(cpfCnpj: string) {
            return this.validaCpfCnpj.validaCpfCnpj(cpfCnpj)
        }
    }

    const mock = {
        validaCpfCnpj: (cpfCnpj: string): boolean => {
            return true
        }
    }

    return new ValidatorCpfCnpjStub(mock)
}

const makeSut = () => {
    const validatorCpfCnpj = makeValidatorCpfCnpj()
    const sut = new CpfCnpjFieldsValidation('cpfCnpj', validatorCpfCnpj)
    return {
        sut,
        validatorCpfCnpj
    }
}

describe('CpfCnpjFieldsValidation', () => {
    test('Shuld return null cpf or cnpj when isValid return true', () => {
        const { sut } = makeSut()
        const response = sut.validate({ cpfCnpj: '12345678910' });
        expect(response).toEqual(null)
    })

    test('Shuld return InvalidParamError cpf or cnpj when invalid cpfCnjp', async () => {
        const { sut, validatorCpfCnpj } = makeSut()
        jest.spyOn(validatorCpfCnpj, 'isValid').mockReturnValueOnce(false)
        const response = sut.validate({ cpfCnpj: 'cpfCnpj' });
        expect(response).toEqual(new InvalidParamError('cpfCnpj'))
    })

    test('Should return InvalidParamError when validatorCpfCpnj return false', async () => {
        const { sut, validatorCpfCnpj } = makeSut()
        jest.spyOn(validatorCpfCnpj, 'isValid').mockImplementationOnce((data: string) => {
            const validator = new ValidatorCpfCnpj()
            const isValid = validator.validaCpfCnpj(data)
            return isValid
        })

        const response = sut.validate({ cpfCnpj: '111742354927' });
        expect(response).toEqual(new InvalidParamError('111742354927'))
    })
})