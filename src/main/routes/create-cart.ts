import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adpter";
import { makeCreateCartController } from "../factories/creat-cart-controller/creat-cart-controller-ractories";
import { adaptMiddleware } from "../adapters/express-middleware-adpter";
import { makeAuthMiddleware } from "../factories/middlewares/auth-middleware";

export default function (router: Router) {
  const authMiddle = adaptMiddleware(makeAuthMiddleware("user"))
  router.get("/create-cart", authMiddle ,adaptRoute(makeCreateCartController()));
}