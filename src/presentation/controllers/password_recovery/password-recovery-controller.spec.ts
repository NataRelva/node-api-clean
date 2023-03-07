import { badRequest } from './../../helpers/http/http.helper';
import { ErrorHandler } from './../../protocols/error-handler';
import { SendEmailPasswordRecovery, IMessage } from './../../../domain/useCases/send-mail-recovery-password';
import { EmailValidator } from './../../protocols/email-validator';
import { PasswordRecoveryController } from './password-recovery-controller';

const makeSut = () => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }
    class SendEmailPasswordRecoveryStub implements SendEmailPasswordRecovery {
        send(props: IMessage): Promise<void> {
            return new Promise(resolve => resolve());
        }
    }
    class ErrorHandlerStub implements ErrorHandler {
        handle(error: Error): Promise<any> {
            return new Promise(resolve => resolve(badRequest(new Error('Email inválido'))));
        }
    }
    const sendEmailPasswordRecoveryStub = new SendEmailPasswordRecoveryStub();
    const errorHandlerStub = new ErrorHandlerStub();
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new PasswordRecoveryController(emailValidatorStub, sendEmailPasswordRecoveryStub, errorHandlerStub);
    return {
        sut,
        emailValidatorStub,
        sendEmailPasswordRecoveryStub,
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

    test('Should return 400 if EmailValidator throws', async () => {
        const { sut, emailValidatorStub } = makeSut();
        const httpRequest = {
            body: {
                email: 'any_email@gmail.com',
            }
        }
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
            throw new Error();
        })
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new Error('Email inválido')));
    })

    test('Should call EmailValidator with correct email', async () => {
        const { sut, emailValidatorStub } = makeSut();
        const httpRequest = {
            body: {
                email: 'any@gmail.com',
            }
        }
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
        await sut.handle(httpRequest);
        expect(isValidSpy).toHaveBeenCalledWith('any@gmail.com');
    })

    test('Should call SendEmailPasswordRecovery with correct email', async () => {
        const { sut, sendEmailPasswordRecoveryStub } = makeSut();
        const httpRequest = {
            body: {
                email: 'any@gmail.com',
            }
        }
        const sendSpy = jest.spyOn(sendEmailPasswordRecoveryStub, 'send');
        await sut.handle(httpRequest);
        expect(sendSpy).toHaveBeenCalledWith({ to: 'any@gmail.com' });
    })


})