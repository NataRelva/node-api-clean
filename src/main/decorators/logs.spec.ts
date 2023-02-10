import { LogErrorRepository } from '../../data/protocols/db/log-error-repository';
import { Controller } from '../../presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '../../presentation/protocols/http';
import { LogControllerDecorator } from './logs';

class ControllerStub implements Controller {
    async handle(httoRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve({
            statusCode: 200,
            body: {
                name: 'any_name',
                email: '',
                phone: 'any_phone',
                cpfCnpj: 'any_cpfCnpj',
                password: 'any_password',
            }
        }))
    }
}

class LogErrorRepositoryStub implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
        return new Promise(resolve => resolve());
    }
}

describe('Logs Controller', () => {
    it('Should be call controller handler', async () => {
        const controllerStub = new ControllerStub();
        const logErrorRepositoryStub = new LogErrorRepositoryStub();
        const handleSpy = jest.spyOn(controllerStub, 'handle');
        const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
        const httpRequest = {
            body: {
                name: 'any_name',
                email: '',
                phone: 'any_phone',
                cpfCnpj: 'any_cpfCnpj',
                password: 'any_password',
            }
        }

        await sut.handle(httpRequest);
        expect(handleSpy).toHaveBeenCalledWith(httpRequest);
    });
})