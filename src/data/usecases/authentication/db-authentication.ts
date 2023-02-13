import { Authentication, AuthenticationModel } from "../../../domain/useCases/authentication";
import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { TokenGeneration } from "../../protocols/criptography/token-generation";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email.repository";
import { UpdateAccessTokenRepository } from "../../protocols/db/update-access-token.repository";

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly hashComparer: HashComparer
    private readonly tokenGeneration: TokenGeneration
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

    constructor(
        loadAccountByEmail: LoadAccountByEmailRepository,
        hashComparer: HashComparer,
        tokenGeneration: TokenGeneration,
        updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
    ) {
        this.loadAccountByEmailRepository = loadAccountByEmail
        this.hashComparer = hashComparer
        this.tokenGeneration = tokenGeneration
        this.updateAccessTokenRepository = updateAccessTokenRepositoryStub
    }

    async auth(authentication: AuthenticationModel): Promise<string | null> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email)
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const accesToken = await this.tokenGeneration.generate(account.id)
                await this.updateAccessTokenRepository.updateAccessToken(account.id, accesToken)
                return accesToken
            }
        }
        return null
    }
}