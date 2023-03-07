import { CheckRegistration } from './../../protocols/check-registration';
import { MailSend } from './../../../domain/useCases/mail-send';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { serverError, ok, badRequest } from './../../helpers/http/http.helper';
import { EmailValidator } from './../../protocols/email-validator';
import { Controller } from './../../protocols/controller';
export class PasswordRecoveryController implements Controller {
    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly checkRegistration: CheckRegistration,
        private readonly mailSend: MailSend
    ) { }
    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { email } = request.body;
            const isValid = this.emailValidator.isValid(email);
            if (!isValid) return badRequest(new Error('Email inválido'));
            const checkAccountAssociatedWithEmail = this.checkRegistration.check('', email);
            if (!checkAccountAssociatedWithEmail) return badRequest(new Error('Email não cadastrado'));
            await this.mailSend.sendMail(email, 'Recuperação de senha', 'password_recovery');
            return ok('E-mail de recuperação de senha enviado com sucesso, verifique sua caixa de entrada.')
        } catch (error) {
            return serverError(error);
        }
    }
}
