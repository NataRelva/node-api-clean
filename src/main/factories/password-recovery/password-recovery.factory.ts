import { makeDbAuthentication } from './../useCases/authentication/db-authentication';
import { SendGridEmailProvider } from './../../../infra/email/sendgrid';
import { SendEmailPasswordRecoveryAdpter } from './../../../presentation/emails/send-email-password-recovery';
import { SendEmailAdpter } from './../../../utils/send-email.adapter';
import { AccountPrismaRepository } from './../../../infra/db/prisma/account-repository/account-prisma.repository';
import { makeValidatorPasswordRecovery } from './password-recovery.validator.factory';
import { PasswordRecoveryController } from './../../../presentation/controllers/password_recovery/password-recovery-controller';
import { Controller } from './../../../presentation/protocols/controller';
import { ErrorHandlerAdapter } from '../../../utils/error-handler-adapter';
import env from '../../config/env';
export const makePasswordRecoveryController = (): Controller => {
    const validation = makeValidatorPasswordRecovery();
    const loadAccountByEmail = new AccountPrismaRepository()
    const authentication = makeDbAuthentication()
    const errorHandler = new ErrorHandlerAdapter()
    const sendGridEmailProvider = new SendGridEmailProvider(env.sendGridKey)
    const emailProvider = new SendEmailAdpter(sendGridEmailProvider)
    const sendEmailPasswordRecovery = new SendEmailPasswordRecoveryAdpter(emailProvider)
    const passwordRecoveryController = new PasswordRecoveryController(validation, sendEmailPasswordRecovery, loadAccountByEmail, authentication, errorHandler);
    return passwordRecoveryController
}