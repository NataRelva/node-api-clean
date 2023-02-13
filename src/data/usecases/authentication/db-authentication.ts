import { LoadAccountByEmailRepository, HashComparer, TokenGeneration, UpdateAccessTokenRepository, AuthenticationModel, Authentication } from "./db-authentication.protocols"

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