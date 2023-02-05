import { Request, Response, Router } from "express";

export default function (router: Router): void {
    router.post("/singup", (req: Request, res: Response) => {
        res.status(200).json({ message: "OK" });
    });
}