import { Router } from "express";
import { adaptMiddleware } from "../adapters/express-middleware-adpter";
import { makeUpdatePersonalInformationController, makeUpdatePersonalLoginController } from "../factories/account/update/update-personal-in]formation.factory";
import { adaptRoute } from "../adapters/express-route-adpter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";

export default function (router: Router): void {
  router.post('/update-personal-information', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdatePersonalInformationController()))
  router.post('/update-personal-login', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdatePersonalLoginController()))
}