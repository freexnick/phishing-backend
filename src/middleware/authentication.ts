import logger from "../config/logger";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/constants";

export function auth(req: Request, res: Response, next: NextFunction) {
    const cookie: string = req.cookies.token;
    const authHeader = req.headers.authorization;

    if ((!authHeader || !authHeader.startsWith("Bearer")) && !cookie) {
        return res.sendStatus(403);
    }

    const token = authHeader?.split(" ")[1] || cookie;

    try {
        jwt.verify(token, JWT_SECRET);
        return next();
    } catch (err) {
        logger.error(err);
        return res.sendStatus(403);
    }
}
