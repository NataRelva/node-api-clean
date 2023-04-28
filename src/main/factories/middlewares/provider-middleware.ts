import { Middleware } from './../../../presentation/protocols/middleware';
import { ProviderMiddleware } from '../../../presentation/middlewares/provider-middleware';
export const makeProviderMiddleware = (providerId: string): Middleware => {
    return new ProviderMiddleware(providerId);
}