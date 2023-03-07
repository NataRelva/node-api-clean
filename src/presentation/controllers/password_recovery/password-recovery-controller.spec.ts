import { MailSend } from './../../../domain/useCases/mail-send';
import { EmailValidator } from './../../protocols/email-validator';
import { CheckRegistration } from './../../protocols/check-registration';
import { PasswordRecoveryController } from './password-recovery-controller';

const makeSut = () => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }
    class CheckRegistrationStub implements CheckRegistration {
        check(cpfCnpj: string, email: string): Promise<void> {
            return new Promise(resolve => resolve());
        }
    }
    class MailSendStub implements MailSend {
        sendMail(to: string, subject: string, type?: 'password_recovery'): Promise<boolean | Error> {
            return new Promise(resolve => resolve(true));
        }
    }
    const mailSendStub = new MailSendStub();
    const checkRegistrationStub = new CheckRegistrationStub();
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new PasswordRecoveryController(emailValidatorStub, checkRegistrationStub, mailSendStub);
    return {
        sut,
        emailValidatorStub
    }
}
describe('Password Recovery Controller', () => {
    test('Should return 400 if no email is provided', async () => {
        const { sut, emailValidatorStub } = makeSut();
        const httpRequest = {
            body: {
                email: ''
            }
        }
        jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new Error('Email inválido'));
    })
})