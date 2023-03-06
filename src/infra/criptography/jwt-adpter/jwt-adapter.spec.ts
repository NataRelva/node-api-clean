import jwt from "jsonwebtoken"
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return new Promise(res => res('any_token'))
    },

    async verify(token: string): Promise<string> {
        return new Promise(res => res('any_value'))
    }
}))

interface TypeSut {
    sut: JwtAdapter
}

const makeSut = (): TypeSut => {
    const sut = new JwtAdapter('secret')
    return {
        sut
    }
}

describe('Jwt Adapter', () => {
    describe('Sign', () => {
        test('Should call sign with correct values', async () => {
            const { sut } = makeSut()
            const signSpy = jest.spyOn(jwt, 'sign')
            await sut.encrypt('any_value')
            expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
        })

        test('Should return a token on sign success', async () => {
            const { sut } = makeSut()
            const accessToken = await sut.encrypt('any_value')
            expect(accessToken).toBe('any_token')
        })

        test('Should throw if sign throws', async () => {
            const { sut } = makeSut()
            jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
                throw new Error()
            })
            const promise = sut.encrypt('any_value')
            await expect(promise).rejects.toThrow()
        })
    })
    describe('Verify', () => {
        test('Should call verify with correct values', async () => {
            const { sut } = makeSut()
            const verifySpy = jest.spyOn(jwt, 'verify')
            await sut.decrypt('any_token')
            expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
        })
    })
})