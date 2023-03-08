import { makePasswordRecoveryController } from './../factories/password-recovery/password-recovery.factory';
import { adaptRoute } from './../adapters/express-route-adpter';
import { Router } from "express";

export default function (router: Router): void {
    router.post("/recovery-password", adaptRoute(makePasswordRecoveryController()));
}