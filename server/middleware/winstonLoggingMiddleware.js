import { createLogger, format, transports } from "winston";
import expressWinston, { requestWhitelist } from "express-winston";

const logsFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} ${level}: ${meta.req.method} ${meta.req.originalUrl} returned ${meta.res.statusCode} in ${meta.responseTime} ms with message "${meta.res.body.message}"`;
});

const loggerOptions = {
    transports: [
        new transports.Console(),
        new transports.File({
            level: "warn",
            filename: "logsWarnings.log",
        }),
        new transports.File({
            level: "error",
            filename: "logsErrors.log",
        }),
        new transports.File({
            level: "info",
            filename: "logsInfo.log",
        }),
    ],
    format: format.combine(format.timestamp(), format.json(), logsFormat),
};

const errorLoggerOptions = {
    transports: [
        new transports.File({
            filename: "logsInternalErrors.log",
        }),
    ],
    format: format.combine(format.json(), format.timestamp(), logsFormat),
};

const logger = expressWinston.logger({
    winstonInstance: createLogger(loggerOptions),
    statusLevels: true,
    colorize: true,
    requestWhitelist: [...expressWinston.requestWhitelist, "body"],
    responseWhitelist: [...expressWinston.responseWhitelist, "body"],
});

const errorLogger = expressWinston.errorLogger(errorLoggerOptions);

export { logger, errorLogger };
