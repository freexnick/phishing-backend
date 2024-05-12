import { User, UserModel } from "../models/users";
import { Types } from "mongoose";

function getUsers() {
    return UserModel.find();
}

function getUserByEmail(email: string) {
    return UserModel.findOne({ email });
}

function getUserById(id: Types.ObjectId) {
    return UserModel.findById({ _id: id });
}

function createUser(values: User) {
    return UserModel.create(values);
}

function updateUser(id: Types.ObjectId, values: User) {
    return UserModel.findOneAndUpdate({ _id: id }, values, { new: true });
}

function deleteUser(id: Types.ObjectId) {
    return UserModel.findOneAndDelete({ _id: id });
}

function getUsersByOrganization(organization: string) {
    const regex = organization;
    return UserModel.find({ organization: new RegExp(regex, "i") });
}

export { getUsers, getUserByEmail, getUserById, createUser, updateUser, deleteUser, getUsersByOrganization };
