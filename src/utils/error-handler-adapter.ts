import { InvalidParamError } from './../presentation/errors/invalid-param.error';
import { badRequest, forbidden } from './../presentation/helpers/http/http.helper';
import { ErrorHandler } from './../presentation/protocols/error-handler';
export class ErrorHandlerAdapter implements ErrorHandler {
    async handle(error: any): Promise<any> {
        console.log(error)
        if (typeof error == 'string') {
            if (error.includes('CPF') || error.includes('E-mail')) {
                return forbidden(new Error(error))
            }
        }
        return badRequest(new InvalidParamError(error))
    }
}