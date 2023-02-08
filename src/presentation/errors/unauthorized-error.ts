export class UnauthorizedError extends Error {
    constructor(msg?: string) {
        if (msg) super(msg)
        else super('Internal server error')
    }
} 