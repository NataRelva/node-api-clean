import { InvalidParamError } from './../presentation/errors/invalid-param.error';
import { badRequest, forbidden } from './../presentation/helpers/http/http.helper';
import { ErrorHandler } from './../presentation/protocols/error-handler';
export class ErrorHandlerAdapter implements ErrorHandler {
    async handle(error: any): Promise<any> {
        if (typeof error == 'string') {
            if (error.includes('CPF') || error.includes('E-mail')) {
                return forbidden({ error })
            }
        }
        return badRequest(new InvalidParamError(error))
    }
}