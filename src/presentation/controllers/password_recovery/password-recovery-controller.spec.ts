// import { ValidationComposite } from './../../helpers/validators/validations.composite';
// import { Authentication } from './../../../domain/useCases/authentication';
// import { AccountModel } from './../../../domain/models/account';
// import { badRequest } from './../../helpers/http/http.helper';
// import { ErrorHandler } from './../../protocols/error-handler';
// import { SendEmailPasswordRecovery } from './../../../domain/useCases/send-mail-recovery-password';
// import { EmailValidator } from './../../protocols/email-validator';
// import { PasswordRecoveryController } from './password-recovery-controller';

// const makeAccountFake = (): AccountModel => ({
//     id: 'any_id',
//     name: 'any_name',
//     email: 'any_email@gmail.com',
//     password: 'any_password',
//     cpfCnpj: 'any_cpfCnpj',
//     phone: 'any_phone',
// })

// const makeSut = () => {
//     class EmailValidatorStub implements EmailValidator {
//         isValid(email: string): boolean {
//             return true;
//         }
//     }
//     class SendEmailPasswordRecoveryStub implements SendEmailPasswordRecovery {
//         send(account: AccountModel, accessToken: string): Promise<void> {
//             return new Promise(resolve => resolve());
//         }
//     }
//     class ErrorHandlerStub implements ValidationComposite {
//         validate(): Promise<any> {
//             return new Promise(resolve => resolve(badRequest(new Error('Email inválido'))));
//         }
//     }
//     class LoadAccountByEmailRepository implements LoadAccountByEmailRepository {
//         async loadByEmail(email: string): Promise<any> {
//             return new Promise(resolve => resolve(makeAccountFake()));
//         }
//     }
//     class AuthenticationStub implements Authentication {
//         async auth(account: AccountModel): Promise<string> {
//             return new Promise(resolve => resolve('any_token'));
//         }
//     }
//     const authenticationStub = new AuthenticationStub();
//     const sendEmailPasswordRecoveryStub = new SendEmailPasswordRecoveryStub();
//     const errorHandlerStub = new ErrorHandlerStub();
//     const emailValidatorStub = new EmailValidatorStub();
//     const loadAccountByEmailRepository = new LoadAccountByEmailRepository();
//     const sut = new PasswordRecoveryController(emailValidatorStub, sendEmailPasswordRecoveryStub, loadAccountByEmailRepository, authenticationStub, errorHandlerStub);
//     return {
//         sut,
//         emailValidatorStub,
//         sendEmailPasswordRecoveryStub,
//     }
// }
// describe('Password Recovery Controller', () => {
//     test('Should return 400 if no email is provided', async () => {
//         const { sut, emailValidatorStub } = makeSut();
//         const httpRequest = {
//             body: {
//                 email: ''
//             }
//         }
//         jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
//         const httpResponse = await sut.handle(httpRequest);
//         expect(httpResponse.statusCode).toBe(400);
//         expect(httpResponse.body).toEqual(new Error('Email inválido'));
//     })

//     test('Should return 400 if EmailValidator throws', async () => {
//         const { sut, emailValidatorStub } = makeSut();
//         const httpRequest = {
//             body: {
//                 email: makeAccountFake().email,
//             }
//         }
//         jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
//             throw new Error();
//         })
//         const httpResponse = await sut.handle(httpRequest);
//         expect(httpResponse).toEqual(badRequest(new Error('Email inválido')));
//     })

//     test('Should call EmailValidator with correct email', async () => {
//         const { sut, emailValidatorStub } = makeSut();
//         const httpRequest = {
//             body: {
//                 email: makeAccountFake().email,
//             }
//         }
//         const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
//         await sut.handle(httpRequest);
//         expect(isValidSpy).toHaveBeenCalledWith(makeAccountFake().email);
//     })

//     test('Should call SendEmailPasswordRecovery with correct email', async () => {
//         const { sut, sendEmailPasswordRecoveryStub } = makeSut();
//         const httpRequest = {
//             body: {
//                 email: makeAccountFake().email,
//             }
//         }
//         const sendSpy = jest.spyOn(sendEmailPasswordRecoveryStub, 'send');
//         await sut.handle(httpRequest);
//         expect(sendSpy).toHaveBeenCalledWith(makeAccountFake(), 'any_token');
//     })


// })

describe('Password Recovery Controller', () => {
    test('Should return 400 if no email is provided', async () => { })
})