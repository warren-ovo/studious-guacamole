// server.js
const express = require("express");
const app = express();

// Require the route files
const route1Handler = require("./routes/route1.js");
const route2Handler = require("./routes/route2.js");
const route3Handler = require("./routes/route3.js");
const logger = require("./logger.js");
const reqInfo = require("./reqInfo");

// Register the route handlers
app.use((req, res, next) => {
  logger.info(`request started ${req.url}`);
  reqInfo.set(req.traceToken || Date.now() + "uuid");
  res.on("finish", () => {
    logger.info(`request finished ${req.url}`);
    reqInfo.delete(req.traceToken || Date.now() + "uuid");
  });
  next();
});

app.get("/route1", route1Handler);
app.get("/route2", route2Handler);
app.get("/route3", route3Handler);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
