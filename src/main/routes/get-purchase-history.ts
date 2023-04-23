import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adpter";
import { makeGetPurchaseHistoryController } from "../factories/get-purchase-history/get-purchase-history-refactory";
import { adaptMiddleware } from "../adapters/express-middleware-adpter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";

export default function (router: Router):void {
  const authMiddle = adaptMiddleware(makeAuthMiddleware("user"))
  router.get('/purchase/history', authMiddle ,adaptRoute(makeGetPurchaseHistoryController()));
}