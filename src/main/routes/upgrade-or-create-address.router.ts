import { Router } from "express";
import { adaptMiddleware } from "../adapters/express-middleware-adpter";
import { adaptRoute } from "../adapters/express-route-adpter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";
import { makeUpgradeOrCreateAddressFactory } from "../factories/upgrade-or-create-address/upgrade-or-create-address.factory";

export default function (router: Router): void {
  router.post('/update-address', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpgradeOrCreateAddressFactory()))
}