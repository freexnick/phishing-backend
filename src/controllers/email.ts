import mailer from "../config/email";
import logger from "../config/logger";
import { MAIL_USER } from "../config/constants";
import { Request, Response } from "express";
import { createMail, getAllMails, updateStatus } from "../db/controllers/email";
import { Email } from "../db/models/email";
import { v4 as uuid } from "uuid";

export async function sendEmail(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
        res.sendStatus(401);
    }

    const uid = uuid();

    const mail = {
        from: MAIL_USER,
        to: email,
        subject: "Phishing Test Email",
        html: `<a href='http://localhost:4000/track/${uid}'>This is a phishing test email. Please do not click on any links or attachments.</a>`,
    };

    try {
        const transporter = mailer();

        await createMail({ uid, employee: email, content: mail.html } as Email);
        await transporter.sendMail(mail);

        return res.sendStatus(200);
    } catch (error) {
        logger.error(error);
        return res.sendStatus(500);
    }
}

export async function updatePhisingStatus(req: Request, res: Response) {
    try {
        const { uid } = req.params!;

        await updateStatus(uid);

        return res.sendStatus(200);
    } catch (err) {
        logger.error(err);
        return res.sendStatus(500);
    }
}

export async function getMails(_req: Request, res: Response) {
    try {
        const mails = await getAllMails();
        return res.status(200).json(mails);
    } catch (err) {
        logger.info(err);
        return res.sendStatus(500);
    }
}
