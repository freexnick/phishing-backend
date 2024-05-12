import winston from "winston";
import { LOG_LEVEL } from "./constants";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "cyan",
    debug: "white",
};

winston.addColors(colors);

export default winston.createLogger({
    levels,
    format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
    transports: [
        new winston.transports.Console({
            level: LOG_LEVEL,
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
            ),
        }),
        new winston.transports.File({
            level: LOG_LEVEL,
            filename: "./logs/app.log",
        }),
    ],
});
