// loggerWrapper.js
const winston = require("winston");

const connection = require("./getConnection");

const winstonLogger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

console.log("12");

const logger = {
  info: (...args) => winstonLogger.info(...args),
  warn: (...args) => winstonLogger.warn(...args),
  error: (...args) => winstonLogger.error(...args),
  debug: (...args) => winstonLogger.debug(...args),
};

module.exports = logger;
