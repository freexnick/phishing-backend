import { Email, EmailModel } from "../models/email";

function getAllMails() {
    return EmailModel.find({});
}

function createMail(values: Email) {
    return EmailModel.create(values);
}

function updateStatus(uid: string) {
    return EmailModel.findOneAndUpdate({ uid }, { phishingStatus: true });
}

export { createMail, getAllMails, updateStatus };
