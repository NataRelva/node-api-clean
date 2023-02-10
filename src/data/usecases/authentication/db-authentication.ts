import { Authentication, AuthenticationModel } from "../../../domain/useCases/authentication";
import { LoadAccountByEmailRepository } from "../../protocols/load-account-by-email.repository";

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    constructor(loadAccountByEmail: LoadAccountByEmailRepository) {
        this.loadAccountByEmailRepository = loadAccountByEmail
    }

    async auth(authentication: AuthenticationModel): Promise<string> {
        await this.loadAccountByEmailRepository.load(authentication.email)
        return ''
    }
}