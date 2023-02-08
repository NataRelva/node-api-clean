import { MissingParamError } from "../../errors/missing-param.error";
import { Controller, HttpRequest, HttpResponse } from "../signup/signup-protocols";
import { EmailValidator } from "../signup/signup-protocols";
import { badRequest, serverError, unauthorized } from "../../helpers/http.helper";
import { InvalidParamError } from "../../errors/invalid-param.error";
import { Authentication } from "../../../domain/useCases/authentication";

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator;
    private readonly authentication: Authentication;

    constructor(
        emailValidator: EmailValidator,
        authentication: Authentication
    ) {
        this.emailValidator = emailValidator;
        this.authentication = authentication;
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['email', 'password'];
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
        }
        const { email, password } = httpRequest.body;
        try {
            const isValidEmail = this.emailValidator.isValid(email);
            if (!isValidEmail) return badRequest(new InvalidParamError('email'));
            const isPasswordValid = await this.authentication.auth(email, password);
            if (!isPasswordValid) return unauthorized();
            return await new Promise(resolve => resolve({ statusCode: 200, body: {} }));
        } catch (error) {
            return serverError();
        }
    }
}