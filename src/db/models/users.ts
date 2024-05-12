import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BCRYPT_SALT, JWT_SECRET, JWT_TTL } from "../../config/constants";

export interface User extends mongoose.Document {
    email: string;
    password: string;
    comparePasswords: (password: string) => Promise<boolean>;
    createJWT: () => string | JwtPayload;
}

const UserSchema: mongoose.Schema<User> = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email",
        ],
        unique: true,
        maxLength: 256,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 256,
    },
});

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(BCRYPT_SALT);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function (userPassword: string) {
    const match = await bcrypt.compare(userPassword, this.password);
    return match;
};

UserSchema.methods.createJWT = function () {
    return jwt.sign({ id: this._id, name: this.name }, JWT_SECRET, {
        expiresIn: JWT_TTL,
    });
};

export const UserModel = mongoose.model<User>("User", UserSchema);
