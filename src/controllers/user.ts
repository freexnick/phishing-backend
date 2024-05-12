import jwt, { JwtPayload } from "jsonwebtoken";
import logger from "../config/logger";
import { createUser, deleteUser, getUserByEmail, getUsers, updateUser, getUserById } from "../db/controllers/users";
import { Request, Response } from "express";
import { JWT_SECRET } from "../config/constants";
import { User } from "../db/models/users";

async function registerUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await createUser({
            email,
            password,
        } as User);

        const token = user.createJWT();

        res.cookie("token", token, { maxAge: 24 * 60 * 60 * 24, httpOnly: true });

        return res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        return res.sendStatus(500);
    }
}

async function signUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.sendStatus(400);
        }

        const match = await user.comparePasswords(password);

        if (!match) {
            return res.sendStatus(403);
        }

        const token = user.createJWT();

        res.cookie("token", token, { maxAge: 24 * 60 * 60 * 24, httpOnly: true });

        return res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        return res.sendStatus(500);
    }
}

async function getUser(req: Request, res: Response) {
    if (!req.headers && !req.headers.authorization) {
        return res.sendStatus(403);
    }

    const authorization = req.headers.authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(authorization, JWT_SECRET) as JwtPayload;

        if (!decoded) {
            return res.sendStatus(403);
        }

        const user = await getUserById(decoded.id);

        if (!user) {
            return res.sendStatus(400);
        }

        return res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        return res.sendStatus(500);
    }
}

async function getAllUsers(_req: Request, res: Response) {
    try {
        const userData = await getUsers();
        return res.status(200).json(userData);
    } catch (err) {
        logger.error(err);
        return res.sendStatus(500);
    }
}

async function userUpdate(req: Request, res: Response) {
    const { _id, email, password } = req.body;

    if (!email || _id || password) {
        return res.sendStatus(401);
    }

    try {
        const user = await updateUser(_id, {
            email,
            password,
        } as User);

        return res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        return res.sendStatus(500);
    }
}

async function userDelete(req: Request, res: Response) {
    const { user_id } = req.body;

    if (!user_id) {
        return res.sendStatus(400);
    }

    try {
        await deleteUser(user_id);
        return res.sendStatus(200);
    } catch (err) {
        logger.error(err);
        return res.sendStatus(500);
    }
}

export { getAllUsers, registerUser, userUpdate, userDelete, signUser, getUser };
