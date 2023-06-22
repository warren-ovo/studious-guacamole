const { smets2Service } = require("../externalAPI");
const logger = require("../logger");

// route1.js
async function route1Handler(req, res) {
  try {
    // Request handler logic for route 1
    const response = await smets2Service.funRoute().catch(e => {
      logger.info("something happened here but this doesnt mean our app is broken and should error")
  
    });
    if(response.status !== 200) {
      logger.warn('we got a funny response')
    }
    res.send("This is route 1111");
    
  } catch (error) {
    if(error instanceof HTTPError) {
      // if we encounter an http error we should always keep throwing until we can 
      // build a response from the error data
    }
  }
}

module.exports = route1Handler;
