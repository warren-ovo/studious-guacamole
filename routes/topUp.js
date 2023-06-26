const logger = require("../logger.js");

module.exports = (req, res, next) => {
    logger.info("got top up with headers, " + JSON.stringify(req.headers));
    res.send({ message: "good" });
  }