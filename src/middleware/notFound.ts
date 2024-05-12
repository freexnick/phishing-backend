import { Request, Response, NextFunction } from "express";

export function routeNotFound(_req: Request, res: Response, _next: NextFunction) {
    const error = new Error("Route not found");

    return res.status(404).json({ error: error.message });
}
