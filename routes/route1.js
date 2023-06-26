const { smets2Service } = require("../externalAPI");
const logger = require("../logger");
const asyncLocalStorage = require("../asyncContext");

// route1.js
async function route1Handler(req, res) {
  try {
    // Request handler logic for route 1
    const topUpData = req.body
    const response = await smets2Service.topUp(topUpData).catch((e) => {
      logger.info(
        "something happened here but this doesnt mean our app is broken and should error",
        asyncLocalStorage.getStore()
      );
    });
    res.send(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      // if we encounter an http error we should always keep throwing until we can
      // build a response from the error data
    }
  }
}

module.exports = route1Handler;
