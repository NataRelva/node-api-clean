import { LoadAccountByToken } from './../../domain/useCases/load-account-by-token';
import { AccessDeniedError } from './../errors/access-denied-error';
import { forbidden, ok } from './../helpers/http/http.helper';
import { HttpRequest, HttpResponse } from './../protocols/http';
import { Middleware } from './../protocols/middleware';

export class AuthMiddleware implements Middleware {
    constructor(private readonly loadAccountByToken: LoadAccountByToken) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const accessToken = httpRequest.headers?.['x-access-token']
        if (accessToken) {
            const account = await this.loadAccountByToken.load(accessToken)
            if (account) {
                return ok(account)
            }
        }
        return forbidden(new AccessDeniedError())
    }
}