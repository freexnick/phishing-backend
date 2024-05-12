import { Request, Response } from "express";

export default function checkHealth(_req: Request, res: Response) {
    return res.sendStatus(200);
}
