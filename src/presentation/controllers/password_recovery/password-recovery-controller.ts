import { PrepareAccountRecoverPassword } from './../../../data/protocols/db/account/prepare-account-recover-password';
import { ErrorHandler } from './../../protocols/error-handler';
import { SendEmailPasswordRecovery } from './../../../domain/useCases/send-mail-recovery-password';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { ok, badRequest, unauthorized } from './../../helpers/http/http.helper';
import { Controller } from './../../protocols/controller';
import { ValidationComposite } from '../../helpers/validators/validations.composite';
export class PasswordRecoveryController implements Controller {
    constructor(
        private readonly prepareAccountRecoverPassword: PrepareAccountRecoverPassword,
        private readonly sendEmailPasswordRecovery: SendEmailPasswordRecovery,
        private readonly validator: ValidationComposite,
        private readonly errorHandler: ErrorHandler
    ) { }
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { email } = request.body;
            const isValid = this.validator.validate(email)
            if (!isValid) return badRequest(new Error('Email inválido'));
            const account = await this.prepareAccountRecoverPassword.prepare(email);
            if (!account) return unauthorized()
            await this.sendEmailPasswordRecovery.send(account);
            return ok({ message: 'Email enviado com sucesso!'})
        } catch (error) {
            return this.errorHandler.handle(error);
        }
    }
}
