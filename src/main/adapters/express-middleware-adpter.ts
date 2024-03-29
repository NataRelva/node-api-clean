import { Middleware } from '../../presentation/protocols/middleware';
import { Request, Response, NextFunction } from "express";
import { HttpRequest } from "../../presentation/protocols/http";

export const adaptMiddleware = (middleware: Middleware) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const httpRequest: HttpRequest = {
            headers: req.headers
        }
        const httpResponse = await middleware.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            Object.assign(req, { body: { ...req.body, accountId: httpResponse.body.id, accessToken: httpResponse.body.accessToken, providerId: httpResponse.body.providerId }});
            next();
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            });
        }
    }
}