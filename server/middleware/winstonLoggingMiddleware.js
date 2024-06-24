import { createLogger, format, transports } from "winston";
import expressWinston, { requestWhitelist } from "express-winston";

const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    
    return formattedDate;
  }
  


const logsFormat = format.printf((info) => {
    const { level, meta, message, timestamp } = info;

    if (meta) {
        return `${formatDate(timestamp)} ${level}: ${meta.req.method} ${
            meta.req.originalUrl
        } returned ${meta.res.statusCode} in ${meta.responseTime} ms ${
            meta.res.body?.message
                ? `with message ${meta.res.body.message}`
                : ""
        }`;
    }

    return `${formatDate(timestamp)} ${level}: ${message}`;
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
