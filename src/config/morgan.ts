import morgan from "morgan";
import logger from "./logger";

export default morgan(
    function (tokens, req, res) {
        return JSON.stringify({
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            status: +tokens.status(req, res),
            content_length: tokens.res(req, res, "content-length"),
            response_time: +tokens["response-time"](req, res),
        });
    },
    {
        stream: {
            write: (message) => {
                const data = JSON.parse(message);
                logger.http(data);
            },
        },
    },
);
