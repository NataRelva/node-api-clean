import { LoadAccountByEmailRepository, HashComparer, Encrypter, UpdateAccessTokenRepository, AccountModel } from "./db-authentication.protocols"
import { DbAuthentication } from "./db-authentication"

interface TypeSut {
    sut: DbAuthentication,
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashComparerStub: HashComparer,
    tokenGeneration: Encrypter,
    updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeFakeRequest = (): { email: string, password: string } => {
    return {
        email: 'email@email.com',
        password: 'password'
    }
}

const makeFakeAccount = (): AccountModel => ({
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email',
    password: 'valid_password',
    phone: 'valid_phone',
    cpfCnpj: 'valid_cpfCnpj',
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async load(value: string): Promise<AccountModel> {
            const account: AccountModel = makeFakeAccount()
            return new Promise(resolver => resolver(account))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparer = (): HashComparer => {
    class HashComparerStub implements HashComparer {
        async compare(value: string, hash: string): Promise<boolean> {
            return new Promise(resolver => resolver(true))
        }
    }
    return new HashComparerStub()
}

const makeEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(id: string): Promise<string> {
            return new Promise(resolver => resolver('valid_token'))
        }
    }

    return new EncrypterStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
    class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
        async updateAccessToken(id: string, token: string): Promise<void> {
            return new Promise(resolver => resolver())
        }
    }
    return new UpdateAccessTokenRepositoryStub()
}

const makeSut = (): TypeSut => {
    const loadAccountByEmailRepository = makeLoadAccountByEmailRepository()
    const hashComparerStub = makeHashComparer()
    const tokenGeneration = makeEncrypter()
    const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
    const sut = new DbAuthentication(loadAccountByEmailRepository, hashComparerStub, tokenGeneration, updateAccessTokenRepositoryStub)
    return { sut, loadAccountByEmailRepository, hashComparerStub, tokenGeneration, updateAccessTokenRepositoryStub }
}

describe('DbAuthentication UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')
        await sut.auth(makeFakeRequest())
        // Espero que seja chamado pelo metodo correto 
        expect(loadSpy).toHaveBeenLastCalledWith('email@email.com')
    })

    test('Should throw if LoadAccountByEmailRepository ', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const response = sut.auth(makeFakeRequest())
        expect(response).rejects.toThrow()
    })

    test('Should return null if LoadAccountByEmailRepository  return null', async () => {
        const { sut, loadAccountByEmailRepository } = makeSut()
        jest.spyOn(loadAccountByEmailRepository, 'load').mockReturnValueOnce(null)
        const accesToken = await sut.auth(makeFakeRequest())
        expect(accesToken).toBeNull()
    })

    test('Should call HashComparer with correct password', async () => {
        const { sut, hashComparerStub } = makeSut()
        const comparerSpy = jest.spyOn(hashComparerStub, 'compare')
        await sut.auth(makeFakeRequest())
        expect(comparerSpy).toHaveBeenLastCalledWith(makeFakeRequest().password, makeFakeAccount().password)
    })

    test('Should throw if HashComparer throws', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolver, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeRequest())
        await expect(promise).rejects.toThrow()
    })

    test('Should return null if HashComparer returns false', async () => {
        const { sut, hashComparerStub } = makeSut()
        jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolver) => resolver(false)))
        const accesToken = await sut.auth(makeFakeRequest())
        await expect(accesToken).toBeNull()
    })

    test('Should throw if TokenGenerator return throws', async () => {
        const { sut, tokenGeneration } = makeSut()
        jest.spyOn(tokenGeneration, 'encrypt').mockReturnValueOnce(new Promise((resolver, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeRequest())
        expect(promise).rejects.toThrow()
    })

    test('Should return token when success', async () => {
        const { sut } = makeSut()
        const accesToken = await sut.auth(makeFakeRequest())
        expect(accesToken).toBe('valid_token')
    })

    test('Should call UpdateAccessTokenRepository with correct values', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut()
        const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
        await sut.auth(makeFakeRequest())
        expect(updateSpy).toHaveBeenCalledWith(makeFakeAccount().id, 'valid_token')
    })

    test('Should throw if UpdateAccessTokenRepository throws', async () => {
        const { sut, updateAccessTokenRepositoryStub } = makeSut()
        jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolver, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeRequest())
        expect(promise).rejects.toThrow()
    })
})