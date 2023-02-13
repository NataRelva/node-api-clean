import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adpter";
import { makeSignupController } from "../factories/singup/singup"

export default function (router: Router): void {
    router.post("/singup", adaptRoute(makeSignupController()));
}