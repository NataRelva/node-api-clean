import { DbAddAccount } from "./db-add-account"

describe('DbAddAaccount Usecase', () => {
    test('Should call Encrypter with correct password', async () => {
        class EncrypterStub {
            async encrypt(value: string): Promise<string> {
                return new Promise(resolver => resolver('passwordHash'))
            }
        }
        const encrypterStub = new EncrypterStub()
        const sut = new DbAddAccount(encrypterStub)
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'name',
            phone: '999888822',
            email: 'email',
            password: 'password',
            cpfCnpj: '11174235497'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('password')
    })
})