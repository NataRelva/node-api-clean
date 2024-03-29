import { MissingParamError } from './../../errors/missing-param.error';
import { InvalidParamError } from '../../errors/invalid-param.error'
import { EmailValidator } from '../../protocols/email-validator'
import { Validation } from './validations'

export class EmailValidation implements Validation {
    
    constructor(
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator
    ) {}

    validate(input: any): Error | null {
        if (!input[this.fieldName]) return new MissingParamError(this.fieldName)
        const emailIsValid = this.emailValidator.isValid(input[this.fieldName])
        if (!emailIsValid) return new InvalidParamError(this.fieldName)
        return null
    }
}