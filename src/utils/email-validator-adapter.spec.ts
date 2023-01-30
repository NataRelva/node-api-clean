import { EmailValidatorAdapter } from "./email-validator-adapter"
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail(): boolean {
        return true;
    }
}))

describe('EmailValidator Adapter',()=> {
    test('should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const emailInvalid = sut.isValid('emailInvalid@gmail')
        expect(emailInvalid).toBe(false)
    })

    test('should return false if validator returns true', () => {
        const sut = new EmailValidatorAdapter()
        const emailInvalid = sut.isValid('emailValid@gmail.com')
        expect(emailInvalid).toBe(true)
    })
})