import { Request, Response, Router } from "express";
import { makeSignupController } from "../factories/singup"

export default function (router: Router): void {
    router.post("/singup", (req: Request, res: Response) => {
        return makeSignupController().handle(req);
    });
}