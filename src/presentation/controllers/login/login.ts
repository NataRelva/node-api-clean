import { MissingParamError } from "../../errors/missing-param.error";
import { Controller, HttpRequest, HttpResponse } from "../signup/signup-protocols";
import { EmailValidator } from "../signup/signup-protocols";
import { badRequest, serverError } from "../../helpers/http.helper";
import { InvalidParamError } from "../../errors/invalid-param.error";

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator;
    constructor(
        emailValidator: EmailValidator,
    ) {
        this.emailValidator = emailValidator;
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredFields = ['email', 'password'];
        for (const field of requiredFields) {
            if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
        }
        try {
            const { email, password } = httpRequest.body;
            const isValidEmail = this.emailValidator.isValid(email);
            if (!isValidEmail) return badRequest(new InvalidParamError('email'));
            // const isValidPassword = this.auth.isValid(password);
            return await new Promise(resolve => resolve({ statusCode: 200, body: {} }));
        } catch (error) {
            return serverError();
        }
    }
}