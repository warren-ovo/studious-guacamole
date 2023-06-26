// loggerWrapper.js
const winston = require("winston");
const asyncLocalStorage = require("./asyncContext");

const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

const logger = {
  info: (...args) => winstonLogger.info(asyncLocalStorage.getStore().traceToken + ' ' + args),
  warn: (...args) => winstonLogger.warn(asyncLocalStorage.getStore().traceToken + ' ' + args),
  error: (...args) => winstonLogger.error(asyncLocalStorage.getStore().traceToken + ' ' + args),
  debug: (...args) => winstonLogger.debug(asyncLocalStorage.getStore().traceToken + ' ' + args),
};

module.exports = logger;
