import { InvalidParamError } from '../../errors/invalid-param.error'
import { Validation } from './validations'

export class CompareFieldsValidation implements Validation {
    private readonly fieldName: string
    private readonly fieldToCompare: string
    constructor(fieldName: string, fieldToCompare: string) {
        this.fieldName = fieldName
        this.fieldToCompare = fieldToCompare
    }

    validate(input: any): Error | null {
        if (input[this.fieldName] !== input[this.fieldToCompare]) {
            return new InvalidParamError(this.fieldToCompare)
        }
        return null
    }
}