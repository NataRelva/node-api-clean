import { InvalidParamError } from './../presentation/errors/invalid-param.error';
import { badRequest } from './../presentation/helpers/http/http.helper';
import { ErrorHandler } from './../presentation/protocols/error-handler';
export class ErrorHandlerAdapter implements ErrorHandler {
    async handle(error: Error): Promise<any> {
        const campo = error['meta']['target'][0]
        if (campo === 'cpfCnpj') return badRequest(new InvalidParamError('CPF ou CNPJ já cadastrado'));
        if (campo === 'email') return badRequest(new InvalidParamError('E-mail já cadastrado'));
        return badRequest(error);
    }
}