import jwt from "jsonwebtoken"
import { RandomUuid } from './../../../data/protocols/criptography/random';
import { Decrypter } from './../../../data/protocols/criptography/decrypter';
import { Encrypter } from "../../../data/protocols/criptography/encrypter"

export class JwtAdapter implements Encrypter, Decrypter, RandomUuid {
    constructor(
        private readonly secret: string
    ) { }

    async random(): Promise<string> { 
        const token = jwt.sign({ id: Math.random() }, this.secret)
        return token
    }

    async encrypt(value: string): Promise<string> {
        const accessToken = jwt.sign({ id: value }, this.secret)
        return accessToken
    }

    async decrypt(token: string): Promise<string> {
        const value: any = jwt.verify(token, this.secret)
        return value
    }
}