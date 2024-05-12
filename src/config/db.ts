import mongoose from "mongoose";
import { MONGODB_URI } from "./constants";

export default function () {
    return mongoose.connect(MONGODB_URI);
}
