const { petService } = require("../externalAPI");
const logger = require("../logger");
const asyncLocalStorage = require("../asyncContext");

// route1.js
async function getPetsHandler(req, res) {
  try {
    // Request handler logic for route 1
    const response = await petService.getPets(req.params.petId).catch((e) => {
      logger.info(
        "something happened here but this doesnt mean our app is broken and should error",
        asyncLocalStorage.getStore()
      );
    });
    res.send(response);
  } catch (error) {
    if (error instanceof HTTPError) {
      res.send(error.statusCode, error.message);
    } else if (error instanceof SPecialError) {
      
    } else {
      throw error;
    }
  }
}

module.exports = getPetsHandler;
