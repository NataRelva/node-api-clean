import { adaptMiddleware } from './../adapters/express-middleware-adpter';
import { makeAuthMiddleware } from './../factories/middlewares/auth-middleware';
import { makeLoginController } from './../factories/login/login-factorie';
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adpter";
import { makeSignupController } from "../factories/singup/singup"

export default function (router: Router): void {
    const adminAuth = adaptMiddleware(makeAuthMiddleware("admin"));
    router.post("/signup", adaptRoute(makeSignupController()));
    router.post("/login", adaptRoute(makeLoginController()));
    // router.post("/login", adminAuth, adaptRoute(makeLoginController()));
}