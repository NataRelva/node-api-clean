import { LogErrorRepository } from "../../../data/protocols/db/log/log-error-repository"
import { Controller } from "../../../presentation/protocols/controller"
import { HttpRequest, HttpResponse } from "../../../presentation/protocols/http"

export class LogControllerDecorator implements Controller {
    
    constructor(
        private readonly controller: Controller,
        private readonly logErrorRepository: LogErrorRepository
    ) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const httpResponse = await this.controller.handle(request)
        if (httpResponse.statusCode === 500) {
            this.logErrorRepository.logError(httpResponse.body.stack)
        }
        return httpResponse
    }
}
