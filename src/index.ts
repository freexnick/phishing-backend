import http from "http";
import express from "express";
import logger from "./config/logger";
import morgan from "./config/morgan";
import connect from "./config/db";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routeNotFound } from "./middleware/notFound";
import { SERVER_HOSTNAME, SERVER_PORT } from "./config/constants";
import { corsOptions } from "./config/cors";

export const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan);
app.use("/", router());
app.use(routeNotFound);

if (process.env.NODE_ENV !== "test") {
    const server = http.createServer(app);
    (async function Main() {
        await connect();
        server.listen(SERVER_PORT, () => {
            logger.info(`Server started on ${SERVER_HOSTNAME}:${SERVER_PORT}`);
        });
    })();
}
