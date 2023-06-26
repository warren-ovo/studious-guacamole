const uuid = require("uuid");
const logger = require("./logger.js");
const asyncLocalStorage = require("./asyncContext");

const ContextMiddleware = (req, res, next) => {
  const { url, traceToken = uuid.v4(), method } = req;
  // here is where the magic happens and the context is inserted
  asyncLocalStorage.run({ url, traceToken, method }, next);
};

const LoggingMiddleware = (req, res, next) => {
  logger.info(`request started ${req.url}`);
  res.on("finish", () => {
    logger.info(`request finished ${req.url}`);
  });
  next();
};

module.exports = {
  ContextMiddleware,
  LoggingMiddleware,
  asyncLocalStorage,
};
