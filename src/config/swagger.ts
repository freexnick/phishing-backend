import swaggerAutogen from "swagger-autogen";
import { SERVER_HOSTNAME, SERVER_PORT } from "./constants";

const doc = {
    info: {
        version: "v1.0.0",
        title: "Phishing",
        description: "Phishing Project",
    },
    servers: [
        {
            url: `http://${SERVER_HOSTNAME}:${SERVER_PORT}`,
            description: "",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
    },
};

const outputFile = "./swagger_output.json";
const endPointsFile = ["../routes/healthcheck", "../routes/user", "../routes/email"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endPointsFile, doc);
