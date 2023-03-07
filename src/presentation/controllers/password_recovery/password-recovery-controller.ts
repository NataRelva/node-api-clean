import { ErrorHandler } from './../../protocols/error-handler';
import { SendEmailPasswordRecovery } from './../../../domain/useCases/send-mail-recovery-password';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { ok, badRequest } from './../../helpers/http/http.helper';
import { EmailValidator } from './../../protocols/email-validator';
import { Controller } from './../../protocols/controller';
export class PasswordRecoveryController implements Controller {
    constructor(
        private readonly validator: EmailValidator,
        private readonly sendEmailPasswordRecovery: SendEmailPasswordRecovery,
        private readonly errorHandler: ErrorHandler
    ) { }
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { email } = request.body;
            const isValid = this.validator.isValid(email)
            if (!isValid) return badRequest(new Error('Email inválido'));
            await this.sendEmailPasswordRecovery.send({ to: email });
            return ok('E-mail de recuperação de senha enviado com sucesso, verifique sua caixa de entrada.')
        } catch (error) {
            return this.errorHandler.handle(error);
        }
    }
}
