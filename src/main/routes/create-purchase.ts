import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adpter";
import { makeCreatePurchaseController } from "../factories/create-purchase.ts/create-purchase-factory";
import { adaptMiddleware } from "../adapters/express-middleware-adpter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";

export default (router: Router): void => {
  const authMiddle = adaptMiddleware(makeAuthMiddleware("user"))
  router.post("/purchase", authMiddle, adaptRoute(makeCreatePurchaseController()));
}