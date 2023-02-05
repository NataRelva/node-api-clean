import app from "../config/app"
import supertest from "supertest"
const request = supertest(app)

describe('Singup Router', () => {
    test('Should return an account on succss', () => {
        const account = {
            name: 'any_name',
            email: '',
            phone: '',
            password: '',
            cpfCnpj: '',
        }

    })
})