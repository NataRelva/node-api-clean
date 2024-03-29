import { ServerError } from "../../errors/server-error"
import { UnauthorizedError } from "../../errors/unauthorized-error"
import { HttpResponse } from "../../protocols/http"

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError()
})

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error
})

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: error
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data
})

export function verifyProps<T>(httpRequest: any, key: string): T {
    if (!httpRequest.body) return null
    if (!httpRequest.body[key]) return null
    return httpRequest.body[key]
}