import { ServerError } from './../errors/server-error';
import { LoadAccountByToken } from './../../domain/useCases/load-account-by-token';
import { AccessDeniedError } from './../errors/access-denied-error';
import { forbidden, ok, serverError } from './../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../protocols/http';
import { Middleware } from './../protocols/middleware';

export class AuthMiddleware implements Middleware {
    constructor(
        private readonly loadAccountByToken: LoadAccountByToken,
        private readonly role?: string
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const accessToken = httpRequest.headers?.['x-access-token']
            if (accessToken) {
                const account = await this.loadAccountByToken.load(accessToken, this.role)
                if (account) {
                    return ok(account)
                }
            }
            return forbidden(new AccessDeniedError())
        } catch (error) {
            return serverError(error)
        }
    }
}