import { Router } from "express";
import { sendEmail, updatePhisingStatus, getMails } from "../controllers/email";
import { auth } from "../middleware/authentication";

export default function (router: Router) {
    router.get("/track/:uid", updatePhisingStatus);
    router.get("/mails", getMails);
    router.post("/send-mail", auth, sendEmail);
}
