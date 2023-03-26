import { SendEmailAdpter } from './../../../services/protocols/send-email.adapter';
import { JwtAdapter } from './../../../infra/criptography/jwt-adpter/jwt-adapter';
import { DbPrepareAccountRecoverPassword } from './../../../data/usecases/prepare-account-recover-password/db-prepare-account-recover-password';
import { SendGridEmailProvider } from './../../../infra/email/sendgrid';
import { SendEmailPasswordRecoveryAdpter } from './../../../presentation/emails/send-email-password-recovery';

import { AccountPrismaRepository } from './../../../infra/db/prisma/account-repository/account-prisma.repository';
import { makeValidatorPasswordRecovery } from './password-recovery.validator.factory';
import { PasswordRecoveryController } from './../../../presentation/controllers/password_recovery/password-recovery-controller';
import { Controller } from './../../../presentation/protocols/controller';
import { ErrorHandlerAdapter } from '../../../utils/error-handler-adapter';
import env from '../../config/env';
export const makePasswordRecoveryController = (): Controller => {
    const validation = makeValidatorPasswordRecovery();
    const errorHandler = new ErrorHandlerAdapter()

    const sendGridEmailProvider = new SendGridEmailProvider(env.sendGridKey)
    const emailProvider = new SendEmailAdpter(sendGridEmailProvider)
    const sendEmailPasswordRecovery = new SendEmailPasswordRecoveryAdpter(emailProvider)

    const updatePasswordResetToken = new AccountPrismaRepository()
    const random = new JwtAdapter(env.jwtSecret)
    const prepareAccountRecoverPassword = new DbPrepareAccountRecoverPassword(updatePasswordResetToken, random)
    
    const passwordRecoveryController = new PasswordRecoveryController(prepareAccountRecoverPassword,sendEmailPasswordRecovery, validation, errorHandler);
    return passwordRecoveryController
}