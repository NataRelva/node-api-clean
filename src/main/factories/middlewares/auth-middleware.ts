import { AuthMiddleware } from './../../../presentation/middlewares/auth-middleware';
import { makeDbLoadAccountByToken } from './../useCases/load-account-by-token/db-load-account-ny-token-factory';
import { Middleware } from './../../../presentation/protocols/middleware';
export const makeAuthMiddleware = (role?: string): Middleware => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role);
}