import { Router } from "express";
import checkHealth from "../controllers/healthcheck";

export default function (router: Router) {
    router.get("/healthcheck", checkHealth);
}
