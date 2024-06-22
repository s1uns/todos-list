import { createLogger, format, transports } from "winston";
import expressWinston, { requestWhitelist } from "express-winston";

const logsFormat = format.printf((info) => {
    const { level, meta, message, timestamp } = info;

    if (meta) {
        return `${timestamp} ${level}: ${meta.req.method} ${
            meta.req.originalUrl
        } returned ${meta.res.statusCode} in ${meta.responseTime} ms ${
            meta.res.body?.message
                ? `with message ${meta.res.body.message}`
                : ""
        }`;
    }

    return `${timestamp} ${level}: ${message}`;
});

const loggerOptions = {
    transports: [
        new transports.Console(),
        new transports.File({
            level: "warn",
            filename: "logs/logsWarnings.log",
        }),
        new transports.File({
            level: "error",
            filename: "logs/logsErrors.log",
        }),
        new transports.File({
            level: "info",
            filename: "logs/logsInfo.log",
        }),
    ],
    format: format.combine(format.timestamp(), format.json(), logsFormat),
};

const errorLoggerOptions = {
    transports: [
        new transports.File({
            filename: "logs/logsInternalErrors.log",
        }),
    ],
    format: format.combine(format.json(), format.timestamp(), logsFormat),
};

const logger = createLogger(loggerOptions);

const errorLogger = expressWinston.errorLogger(errorLoggerOptions);

export { logger, errorLogger };
