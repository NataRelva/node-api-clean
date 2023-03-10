import { MissingParamError } from '../../errors/missing-param.error'
import { Validation } from './validations'

export class RequiredFieldValid implements Validation {
    private readonly fieldName: string
    constructor(fieldName: string) {
        this.fieldName = fieldName
    }

    validate(input: any): Error | null {
        if (!input[this.fieldName]) {
            return new MissingParamError(this.fieldName)
        }
        return null
    }
}