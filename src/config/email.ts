import nodemailer from "nodemailer";
import { MAIL_SMPT, MAIL_PORT, MAIL_USER, MAIL_PASS } from "./constants";

export default function mailer() {
    const transporter = nodemailer.createTransport({
        host: MAIL_SMPT,
        port: MAIL_PORT,
        secure: false,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        },
    });
    return transporter;
}
