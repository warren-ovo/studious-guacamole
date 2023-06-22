const logger = require("./logger");

module.exports = {
  specialSubRoutine() {
    // do fancy logic
    logger.info(
      "a special thing happened so we ran this function and it does some loggging"
    );
  },
};
