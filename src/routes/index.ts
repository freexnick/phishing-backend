import express, { Router } from "express";
import user from "./user";
import healthcheck from "./healthcheck";
import email from "./email";

const router = express.Router();

export default function (): Router {
    healthcheck(router);
    user(router);
    email(router);
    return router;
}
