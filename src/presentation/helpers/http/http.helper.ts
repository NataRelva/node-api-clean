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

export const forbidden = (error: any): HttpResponse => ({
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