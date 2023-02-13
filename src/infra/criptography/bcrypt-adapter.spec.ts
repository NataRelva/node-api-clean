import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(res => res('anythingHash'))
    },
    async compare(): Promise<boolean> {
        return new Promise(res => res(true))
    }
}))

interface TypeSut {
    sut: BcryptAdapter
}

const makeSut = (): TypeSut => {
    const sut = new BcryptAdapter(12)
    return {
        sut
    }
}

describe('Bcrypt Adapter', () => {
    test('Should call bcrypt with correct value', async () => {
        const { sut } = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.hash('anything')
        expect(hashSpy).toHaveBeenCalledWith('anything', 12)
    })
    test('Should return a hash on success', async () => {
        const { sut } = makeSut()
        const hash = await sut.hash('anything')
        expect(hash).toBe('anythingHash')
    })
    test('Should throw if bcrypt throws', async () => {
        const { sut } = makeSut()
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
            throw new Error()
        })
        const promise = sut.hash('anything')
        await expect(promise).rejects.toThrow()
    })

    test('Should call bcrypt with correct value', async () => {
        const { sut } = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.hash('anything')
        expect(hashSpy).toHaveBeenCalledWith('anything', 12)
    })

    test('Should call compare with correct values', async () => {
        const { sut } = makeSut()
        const compareSpy = jest.spyOn(bcrypt, 'compare')
        await sut.compare('any_value', 'any_hash')
        expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })
})