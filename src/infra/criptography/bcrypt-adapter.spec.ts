import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(res => res('anythingHash'))
    }
}))

describe('Bcrypt Adapter', () => {
    test('Should call bcrypt with correct value', async () => {
        const sut = new BcryptAdapter(12)
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('anything')
        expect(hashSpy).toHaveBeenCalledWith('anything', 12)
    })
    test('Should return a hash on success', async () => {
        const sut = new BcryptAdapter(12)
        const hash = await sut.encrypt('anything')
        expect(hash).toBe('anythingHash')
    })
})