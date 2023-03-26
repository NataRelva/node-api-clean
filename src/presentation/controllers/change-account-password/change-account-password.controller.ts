import { ChangeAccountPassword } from './../../../domain/useCases/account/change-account-password';
import { ErrorHandler } from './../../protocols/error-handler';
import { ok, badRequest } from './../../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { Controller } from './../../protocols/controller';
export class ChangeAccountPasswordController implements Controller {
    constructor(
        private readonly erroHandler: ErrorHandler,
        private readonly changeAccountPassword: ChangeAccountPassword,
    ) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const accessToken = httpRequest.headers['x-access-token'];
        const { password, email } = httpRequest.body;
        if (!email) return badRequest(new Error('Email não informado!'));
        if (!accessToken) return badRequest(new Error('Token não informado!'));
        if (!password) return badRequest(new Error('Senha não informada!'));
        try {
            await this.changeAccountPassword.change(accessToken, email, password);
            return ok('Senha alterada com sucesso!')
        } catch (error) {
            return this.erroHandler.handle(error)
        }
    }
}