import { InvalidParamError } from '../../errors/invalid-param.error'
import { EmailValidator } from '../../protocols/email-validator'
import { Validation } from './validations'

export class EmailValidation implements Validation {
    private readonly fieldName: string
    private readonly emailValidator: EmailValidator
    constructor(fieldName: string, emailValidator: EmailValidator) {
        this.fieldName = fieldName
        this.emailValidator = emailValidator
    }

    validate(input: any): Error | null {
        const emailIsValid = this.emailValidator.isValid(input[this.fieldName])
        if (!emailIsValid) return new InvalidParamError(this.fieldName)
        return null
    }
}