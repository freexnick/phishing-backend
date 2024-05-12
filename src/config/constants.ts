import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

dotenvExpand.expand(dotenv.config());

const { env } = process;

const SERVER_HOSTNAME = env.SERVER_HOSTNAME || "localhost";
const FRONT_HOSTNAME = env.FRONT_HOSTNAME || "localhost";
const LOG_LEVEL = env.LOG_LEVEL || "http";
const MONGODB_HOST = env.MONGODB_HOST || "localhost";
const MONGODB_USERNAME = env.MONGODB_USERNAME || "";
const MONGODB_PASSWORD = env.MONGODB_PASSWORD || "";
const JWT_SECRET = env.JWT_SECRET || "";
const JWT_TTL = env.JWT_TTL || "7dx";
const MAIL_SMPT = env.MAIL_SMTP || "localhost";
const MAIL_USER = env.MAIL_USER || "";
const MAIL_PASS = env.MAIL_PASS || "";
const MAIL_PORT = +env.MAIL_PORT || 587;
const SERVER_PORT = +env.SERVER_PORT || 5000;
const FRONT_PORT = +env.FRONT_PORT || 3000;
const MONGODB_PORT = +env.MONGODB_PORT || 27017;
const BCRYPT_SALT = +env.SALT || 10;
const MONGODB_URI = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`;

export {
    SERVER_HOSTNAME,
    SERVER_PORT,
    LOG_LEVEL,
    MONGODB_URI,
    BCRYPT_SALT,
    JWT_TTL,
    JWT_SECRET,
    FRONT_HOSTNAME,
    FRONT_PORT,
    MAIL_PASS,
    MAIL_USER,
    MAIL_SMPT,
    MAIL_PORT,
};
