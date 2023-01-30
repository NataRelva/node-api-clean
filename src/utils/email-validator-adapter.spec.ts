import { EmailValidatorAdapter } from "./email-validator-adapter"

describe('EmailValidator Adapter',()=> {
    test('should return false if validator returns false', () => {
        const sut = new EmailValidatorAdapter()
        const emailInvalid = sut.isValid('invalid_email@gmail.com')
        expect(emailInvalid).toBe(false)
    })
})