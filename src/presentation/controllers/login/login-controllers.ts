import { Controller, HttpRequest, HttpResponse } from "../signup/signup-controllers-protocols";
import { badRequest, ok, serverError, unauthorized } from "../../helpers/http/http.helper";
import { Authentication } from "../../../domain/useCases/authentication";
import { Validation } from "../../helpers/validators/validations";

export class LoginController implements Controller {

    constructor(
        private readonly validator: Validation,
        private readonly authentication: Authentication
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body);
            if (error) return badRequest(error);
            const accessToken = await this.authentication.auth(httpRequest.body);
            if (!accessToken) return unauthorized();
            return ok({ accessToken })
        } catch (error) {
            return serverError(error);
        }
    }
}