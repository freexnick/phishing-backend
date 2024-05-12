import { Router } from "express";
import { getAllUsers, getUser, registerUser, signUser, userDelete, userUpdate } from "../controllers/user";

export default function (router: Router) {
    router.get("/user", getUser);
    router.get("/users", getAllUsers);
    router.post("/user/register", registerUser);
    router.post("/user/sign-in", signUser);
    router.patch("/user/update", userUpdate);
    router.delete("/user/remove", userDelete);
}
