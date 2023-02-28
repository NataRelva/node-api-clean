import { InvalidParamError } from "../../errors/invalid-param.error"
import { CpfCnpjValidator } from "../../protocols/cpf-cnpj-validator"
import { Validation } from "./validations"

export class CpfCnpjFieldsValidation implements Validation {
    private readonly fieldName: string
    private readonly cpfCnpjValidator: CpfCnpjValidator
    constructor(
        fieldName: string,
        cpfCnpjValidator: CpfCnpjValidator,
    ) {
        this.fieldName = fieldName
        this.cpfCnpjValidator = cpfCnpjValidator
    }

    validate(input: any): Error | null {
        if (!input[this.fieldName]) return new InvalidParamError(this.fieldName)
        const cpfOrCpnjIsValid = this.cpfCnpjValidator.isValid(input[this.fieldName])
        if (!cpfOrCpnjIsValid) return new InvalidParamError(input[this.fieldName])
        return null
    }
}