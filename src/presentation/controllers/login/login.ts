import { MissingParamError } from "../../errors/missing-param.error";
import { Controller, HttpRequest, HttpResponse } from "../signup/signup-protocols";
import { EmailValidator } from "../signup/signup-protocols";
import { badRequest, ok, serverError, unauthorized } from "../../helpers/http.helper";
import { InvalidParamError } from "../../errors/invalid-param.error";
import { Authentication } from "../../../domain/useCases/authentication";
import { Validation } from "../../helpers/validators/validations";

export class LoginController implements Controller {
    private readonly validator: Validation;
    private readonly authentication: Authentication;

    constructor(
        validator: Validation,
        authentication: Authentication
    ) {
        this.validator = validator;
        this.authentication = authentication;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body);
            if (error) return badRequest(error);
            const { email, password } = httpRequest.body;
            const accessToken = await this.authentication.auth(email, password);
            if (!accessToken) return unauthorized();
            return ok({ accessToken })
        } catch (error) {
            return serverError();
        }
    }
}