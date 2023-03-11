import { adaptMiddleware } from './../adapters/express-middleware-adpter';
import { makeAuthMiddleware } from './../factories/middlewares/auth-middleware';
import { adaptRoute } from './../adapters/express-route-adpter';
import { Router } from "express";
import { makeChangeAccountPasswordController } from '../factories/chage-account-password/chage-account-password-factory';

export default function (router: Router): void {
    const adminAuth = adaptMiddleware(makeAuthMiddleware("user"));
    router.post('/change-account-password', adaptRoute(makeChangeAccountPasswordController()));
}