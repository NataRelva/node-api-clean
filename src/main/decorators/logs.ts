import { Controller } from "../../presentation/protocols/controller"
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http"

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller
    constructor(controller: Controller) {
        this.controller = controller
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        const httpResponse = await this.controller.handle(request)
        if (httpResponse.statusCode === 500) {
            // Realizar implementação de registro de log
        }
        return httpResponse
    }
}
