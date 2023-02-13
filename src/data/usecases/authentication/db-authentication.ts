import { Authentication, AuthenticationModel } from "../../../domain/useCases/authentication";
import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email.repository";

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly hashComparer: HashComparer
    constructor(
        loadAccountByEmail: LoadAccountByEmailRepository,
        hashComparer: HashComparer) {
        this.loadAccountByEmailRepository = loadAccountByEmail
        this.hashComparer = hashComparer
    }

    async auth(authentication: AuthenticationModel): Promise<string | null> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email)
        if (!account) return null
        await this.hashComparer.compare(authentication.password, account.password)
        return null
    }
}