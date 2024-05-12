import mongoose from "mongoose";

export interface Email extends mongoose.Document {
    uid: string;
    employee: string;
    content: string;
    phishingStatus: boolean;
}

const EmailSchema: mongoose.Schema<Email> = new mongoose.Schema({
    uid: { type: String, required: true },
    employee: { type: String, required: true },
    content: { type: String, required: true },
    phishingStatus: { type: Boolean, default: false },
});

export const EmailModel = mongoose.model<Email>("Email", EmailSchema);
